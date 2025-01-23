import { useEffect, useRef, useState } from "react";

import { GithubService } from "@/services/GithubService";
import { Linking } from "react-native";
import { Repository, RepositoryFilterParams } from "@/models/Repository";
import { RepositoryService } from "@/services/RepositoryService";
import { ResultData } from "@/models/Core";

const githubService = new GithubService()

export default function useRepositories(params: RepositoryFilterParams): ResultData<Repository, RepositoryFilterParams>  {
    const serviceReference = useRef<RepositoryService>(githubService)
    const [loading, setLoading] = useState(false)
    const [isLoadingMore, setLoadingMore] = useState(false)
    const [isComplete, setComplete] = useState(false)
    const [total, setTotal] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [repositories, setRepositories] = useState<Repository[]>([])
    const pageParams = useRef<RepositoryFilterParams>({page: 1})

    useEffect(() => {
        getData(params)
    }, [])

 

    const loadMore = async () => {   
           if(loading || isLoadingMore || isComplete ) return
           
           setLoadingMore(true)
          
           pageParams.current = {...pageParams.current, page: pageParams.current.page + 1}
          
           try{
            const response = await serviceReference.current.getRepositories(pageParams.current)
            setRepositories(prev => [...prev, ...response.items])
            setError(null)
            if(response.items.length == 0){
                setComplete(true)
             }
             setLoadingMore(false)
            
           }catch(err){
            pageParams.current = {...pageParams.current, page: pageParams.current.page - 1}
            await new Promise((res) => setTimeout(res, 5000))
            console.error(err)
            setError("")
            setLoadingMore(false)
            setLoading(false)

            loadMore()
           }
        
       }
   
       const openUrl = async (url: string) => {
           // Verifica si la URL puede ser abierta
           const supported = await Linking.canOpenURL(url);
       
           if (supported) {
             // Abre la URL
             await Linking.openURL(url);
           } else {
             alert(`No se puede abrir esta URL: ${url}`);
           }
         };
       
   
       const getData = async (params: RepositoryFilterParams) => {
           try{
               setLoading(true)
               pageParams.current = {...params, page: 1}
               const response = await serviceReference.current.getRepositories(pageParams.current)
               setComplete(false)
               setTotal(response.total)
               setRepositories(response.items)
           }catch(error){
               console.error(error)
               setTotal(0)
               setError("")
               setRepositories([])
           }finally {
               setLoading(false)
               setLoadingMore(false)
           }
       }

    return ({
        data: repositories,
        loading,
        error,
        total,
        isComplete,
        isLoadingMore,
        openUrl,
        loadMore,
         getData
    })
    

}