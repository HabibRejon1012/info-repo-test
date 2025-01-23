import { RepositoryFilterParams, RepositorySearchResponse } from "../models/Repository";
export interface RepositoryService {
    getRepositories(query?: RepositoryFilterParams): Promise<RepositorySearchResponse>
}

