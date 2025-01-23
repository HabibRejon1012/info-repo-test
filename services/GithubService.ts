import {
  GithubUserRequest,
  GithubRepositoriesRequest,
  UserGithub,
} from "../models/Github";
import {
  Repository,
  RepositoryFilterParams,
  RepositorySearchResponse,
} from "../models/Repository";
import { User, UserFilterParams, UserSearchResponse } from "../models/User";
import { RepositoryService } from "./RepositoryService";
import { UserService } from "./UserService";

export class GithubService implements UserService, RepositoryService {
  constructor(
    private apiKey: string | undefined = process.env.API_GITHUB_KEY,
    private apiUrl: string | undefined = process.env.EXPO_PUBLIC_API_GITHUB_URL
  ) {
    if (!apiKey) throw new Error("Api key is mandatory.");
    if (!apiUrl) throw new Error("Api url is mandatory.");
  }
  async getRepositories(
    query?: RepositoryFilterParams
  ): Promise<RepositorySearchResponse> {
    const url = `${this.apiUrl}search/repositories?q=${encodeURIComponent(
      query?.name ?? ""
    )}&page=${query?.page ?? "1"}&per_page=${query?.perPage ?? 100}`;
    console.log(url);
    const request = await fetch(url, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    if (request.status != 200)
      throw Error(`Service return status ${request.status}`);

    const githubResponse = (await request.json()) as GithubRepositoriesRequest;

    return {
      total: githubResponse.total_count,
      items: githubResponse.items.map((item) => ({
        id: item.id,
        url: item.html_url,
        name: item.name,
        propietarioName: item.owner.login,
        propietarioImageUrl: item.owner.avatar_url,
        description: item.description,
        size: item.size,
        isPrivate: item.private,
        propietarioId: item.owner.id,
      })),
    };
  }

  async getUsers(query?: UserFilterParams): Promise<UserSearchResponse> {
    const url = `${this.apiUrl}search/users?q=${encodeURIComponent(
      query?.name ?? ""
    )}&page=${query?.page ?? "1"}&per_page=${query?.perPage ?? 40}`;
    console.log(url);
    const request = await fetch(url, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    if (request.status != 200)
      throw Error(`Service return status ${request.status}`);
    const githubResponse = (await request.json()) as GithubUserRequest;

    return {
      total: githubResponse.total_count,
      items: githubResponse.items.map(
        (item) =>
          ({
            githubName: item.login,
            id: item.id,
            avatarUrl: item.avatar_url,
            url: item.html_url,
            type: item.type,
            name: item.name,
          } ) as User
      ),
    };
  }
}
