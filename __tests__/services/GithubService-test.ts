import { RepositoryGithub, UserGithub } from "../../models/Github";
import { Repository } from "../../models/Repository";
import { User } from "../../models/User";
import { GithubService } from "../../services/GithubService";

describe("Validate Github Service", () => {
  let service: GithubService;
  beforeEach(() => {
    global.fetch = jest.fn();
    service = new GithubService("test", "test");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("the api key is mandatory", () => {
    expect(() => new GithubService(undefined, "dsf")).toThrow(
      "Api key is mandatory."
    );
  });

  it("the api url is mandatory", () => {
    expect(() => new GithubService("test", undefined)).toThrow(
      "Api url is mandatory."
    );
  });

  it("If the status for fetching repositories is different from 200, it should throw an error.", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 403,
      json: jest.fn().mockResolvedValue({
        items: [],
      }),
    });

    await expect(service.getRepositories({ page: 1 })).rejects.toThrow(
      "Service return status 403"
    );
  });

  it("If the status for fetching users is different from 200, it should throw an error.", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 403,
      json: jest.fn().mockResolvedValue({
        items: [],
      }),
    });

    await expect(service.getUsers({ page: 1 })).rejects.toThrow(
      "Service return status 403"
    );
  });
 
  it("Should return the users when the request status is 200.", async () => {
    const items = [{
        id: 1,
        login: "habib",
        avatar_url: "test",
        name: "habib",
        url: "test",
        type: "test",
        html_url: "test"
    }] as UserGithub[]

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        items,
        total_count: 20,
      }),
    });
    const serviceResponse = await service.getUsers({ page: 1 })
    const usersResponse = [{
        id: 1,
        githubName: "habib",
        avatarUrl: "test",
        name: "habib",
        url: "test",
        type: "test",
    }] as User[]

     expect(serviceResponse).toEqual({items: usersResponse, total: 20 });
  });

  it("Should return the repositories when the request status is 200.", async () => {
    const items = [
        {
          "id": 3081286,
          "node_id": "MDEwOlJlcG9zaXRvcnkzMDgxMjg2",
          "name": "Tetris",
          "full_name": "dtrupenn/Tetris",
          "owner": {
            "login": "dtrupenn",
            "id": 872147,
            "node_id": "MDQ6VXNlcjg3MjE0Nw==",
            "avatar_url": "https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
            "gravatar_id": "",
            "url": "https://api.github.com/users/dtrupenn",
            "type": "User",
            "html_url": "https://github.com/octocat",
            "site_admin": true
          },
          "private": false,
          "html_url": "https://github.com/dtrupenn/Tetris",
          "description": "A C implementation of Tetris using Pennsim through LC4",
          "fork": false,
          "url": "https://api.github.com/repos/dtrupenn/Tetris",
          "created_at": "2012-01-01T00:31:50Z",
          "updated_at": "2013-01-05T17:58:47Z",
          "pushed_at": "2012-01-01T00:37:02Z",
          "homepage": "https://github.com",
          "size": 524,
          "stargazers_count": 1,
          "watchers_count": 1,
          "language": "Assembly",
          "forks_count": 0,
          "open_issues_count": 0,
          
          "default_branch": "master",
          "archive_url": "https://api.github.com/repos/dtrupenn/Tetris/{archive_format}{/ref}",
          "assignees_url": "https://api.github.com/repos/dtrupenn/Tetris/assignees{/user}",
          "blobs_url": "https://api.github.com/repos/dtrupenn/Tetris/git/blobs{/sha}",
          "branches_url": "https://api.github.com/repos/dtrupenn/Tetris/branches{/branch}",
          "collaborators_url": "https://api.github.com/repos/dtrupenn/Tetris/collaborators{/collaborator}",
          "comments_url": "https://api.github.com/repos/dtrupenn/Tetris/comments{/number}",
          "commits_url": "https://api.github.com/repos/dtrupenn/Tetris/commits{/sha}",
          "compare_url": "https://api.github.com/repos/dtrupenn/Tetris/compare/{base}...{head}",
          "contents_url": "https://api.github.com/repos/dtrupenn/Tetris/contents/{+path}",
          "contributors_url": "https://api.github.com/repos/dtrupenn/Tetris/contributors",
          "deployments_url": "https://api.github.com/repos/dtrupenn/Tetris/deployments",
          "downloads_url": "https://api.github.com/repos/dtrupenn/Tetris/downloads",
          "events_url": "https://api.github.com/repos/dtrupenn/Tetris/events",
          "forks_url": "https://api.github.com/repos/dtrupenn/Tetris/forks",
          "git_commits_url": "https://api.github.com/repos/dtrupenn/Tetris/git/commits{/sha}",
          "git_refs_url": "https://api.github.com/repos/dtrupenn/Tetris/git/refs{/sha}",
          "git_tags_url": "https://api.github.com/repos/dtrupenn/Tetris/git/tags{/sha}",
          "git_url": "git:github.com/dtrupenn/Tetris.git",
          "issue_comment_url": "https://api.github.com/repos/dtrupenn/Tetris/issues/comments{/number}",
          "issue_events_url": "https://api.github.com/repos/dtrupenn/Tetris/issues/events{/number}",
          "issues_url": "https://api.github.com/repos/dtrupenn/Tetris/issues{/number}",
          "keys_url": "https://api.github.com/repos/dtrupenn/Tetris/keys{/key_id}",
          "labels_url": "https://api.github.com/repos/dtrupenn/Tetris/labels{/name}",
          "languages_url": "https://api.github.com/repos/dtrupenn/Tetris/languages",
          "merges_url": "https://api.github.com/repos/dtrupenn/Tetris/merges",
          "milestones_url": "https://api.github.com/repos/dtrupenn/Tetris/milestones{/number}",
          "notifications_url": "https://api.github.com/repos/dtrupenn/Tetris/notifications{?since,all,participating}",
          "pulls_url": "https://api.github.com/repos/dtrupenn/Tetris/pulls{/number}",
          "releases_url": "https://api.github.com/repos/dtrupenn/Tetris/releases{/id}",
          "ssh_url": "git@github.com:dtrupenn/Tetris.git",
          "stargazers_url": "https://api.github.com/repos/dtrupenn/Tetris/stargazers",
          "statuses_url": "https://api.github.com/repos/dtrupenn/Tetris/statuses/{sha}",
          "subscribers_url": "https://api.github.com/repos/dtrupenn/Tetris/subscribers",
          "subscription_url": "https://api.github.com/repos/dtrupenn/Tetris/subscription",
          "tags_url": "https://api.github.com/repos/dtrupenn/Tetris/tags",
          "teams_url": "https://api.github.com/repos/dtrupenn/Tetris/teams",
          "trees_url": "https://api.github.com/repos/dtrupenn/Tetris/git/trees{/sha}",
          "clone_url": "https://github.com/dtrupenn/Tetris.git",
          "mirror_url": "git:git.example.com/dtrupenn/Tetris",
          "hooks_url": "https://api.github.com/repos/dtrupenn/Tetris/hooks",
          "svn_url": "https://svn.github.com/dtrupenn/Tetris",
          "forks": 1,
          "open_issues": 1,
          "watchers": 1,
          "has_issues": true,
          "has_projects": true,
          "has_pages": true,
          "has_wiki": true,
          "has_downloads": true,
          "archived": true,
          "disabled": true,
          "visibility": "private",
          "license": {
            "key": "mit",
            "name": "MIT License",
            "url": "https://api.github.com/licenses/mit",
            "spdx_id": "MIT",
            "node_id": "MDc6TGljZW5zZW1pdA==",
          }
        }
      ] as RepositoryGithub[]

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        items,
        total_count: 20,
      }),
    });
    const serviceResponse = await service.getRepositories({ page: 1 })
    const item = items[0]
    const itemsResponse = [{
        id: item.id,
        url: item.html_url,
        name: item.name,
        propietarioName: item.owner.login,
        propietarioImageUrl: item.owner.avatar_url,
        description: item.description,
        size: item.size,
        isPrivate: item.private,
        propietarioId: item.owner.id,
    }] as Repository[]

     expect(serviceResponse).toEqual({items: itemsResponse, total: 20 });
  });
});
