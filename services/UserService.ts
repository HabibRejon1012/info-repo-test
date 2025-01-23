import { User, UserFilterParams, UserSearchResponse } from "../models/User";

export interface UserService {
    getUsers(query?: UserFilterParams): Promise<UserSearchResponse>
}

