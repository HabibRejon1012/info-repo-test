export type Repository = {
    id: number,
    name: string,
    url: string,
    propietarioId: number,
    propietarioName: string,
    propietarioImageUrl: string,
    description: string | null,
    size: number,
    isPrivate: boolean
}

export type RepositoryFilterParams = {
    name?: string,
    page: number,
    perPage?: number
 
 }

 export type RepositorySearchResponse = {
    items: Repository[],
    total: number
 }

