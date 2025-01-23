import { useEffect, useRef, useState } from "react";

import { UserService } from "@/services/UserService";
import { GithubService } from "@/services/GithubService";
import { User, UserFilterParams } from "@/models/User";
import { Linking } from "react-native";
import { ResultData } from "@/models/Core";

const githubService = new GithubService()

export default function useUsers(params: UserFilterParams): ResultData<User, UserFilterParams>  {
    const serviceReference = useRef<GithubService>(githubService)
    const [loading, setLoading] = useState(false)
    const [isLoadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [isComplete, setComplete] = useState(false)
    const [total, setTotal] = useState<number | null>(null)
    const pageParams = useRef<UserFilterParams>({page: 0})

    useEffect(() => {
        getData(params)
    }, [])

   

    const loadMoreUsers = async () => {

        if(loading || isLoadingMore || isComplete) return
        setLoadingMore(true)
        pageParams.current = {...pageParams.current, page: pageParams.current.page + 1}
        const newUsers = await serviceReference.current.getUsers(pageParams.current)
        setUsers(prev => [...prev, ...newUsers.items])
        if(newUsers.items.length == 0){
            setComplete(true)
         }
        setLoadingMore(false)
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
    

    const getData = async (params: UserFilterParams) => {
        try{
            setLoading(true)
            pageParams.current = {...params, page: 1}
            const newUsers = await serviceReference.current.getUsers(pageParams.current)
            setComplete(false)
            setTotal(newUsers.total)
            setUsers(newUsers.items)
        }catch(error){
            console.error(error)
            setTotal(0)
            setError("")
        }finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    return ({
        data: users,
        loading,
        error,
        isComplete,
        total,
        isLoadingMore,
        openUrl,
        loadMore: loadMoreUsers,
        getData
    })
    

}