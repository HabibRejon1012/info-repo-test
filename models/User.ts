export type User = {
   githubName: string; // Nombre de usuario en GitHub
   id: number; // ID único del usuario
   avatarUrl: string; // URL del avatar del usuario
   url: string; // URL de la API del usuario
   type: string; // Tipo de usuario (puede ser "User" o "Organization")
   name: string | null; // Nombre completo del usuario
}

export type UserFilterParams = {
   name?: string,
   page: number,
   perPage?: number

}

 export type UserSearchResponse = {
    items: User[],
    total: number
 }

