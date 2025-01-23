import { renderHook, act, waitFor } from "@testing-library/react-native";
import { UserFilterParams, UserSearchResponse } from "@/models/User";
import { Linking } from "react-native";
import { GithubService } from "../../services/GithubService";
import useUsers from "../../hooks/UseUsers";
import { RepositorySearchResponse } from "../../models/Repository";




jest.mock("@/services/GithubService", () => {
  const mockRepositories = {
      items: [
        {
          id: 1,
          name: "habib",
          url: "url",
          propietarioId: 2,
          propietarioName: "habib",
          propietarioImageUrl: "image",
          description: "test",
          size: 1,
          isPrivate: false
        },
      ],
      total: 20,
    } as RepositorySearchResponse;
  const mockUsers = {
    items: [
      {
        githubName: "habib",
        id: 1,
        avatarUrl: "test",
        url: "test",
        type: "user",
        name: "habib",
      },
    ],
    total: 20,
  } as UserSearchResponse;
  return {
    GithubService: jest.fn().mockImplementation(() => ({
      getUsers: jest.fn().mockResolvedValue(mockUsers),
      getRepositories: jest.fn().mockResolvedValue(mockRepositories)
    
    })),
  };
});

jest.mock("react-native", () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn(),
  },
}));

describe("useUsers validations.", () => {
  const mockUsers = {
    items: [{
      githubName: "habib",
      id: 1,
      avatarUrl: "test",
      url: "test",
      type: "user",
      name: "habib",
    }],
    total: 20,
  } as UserSearchResponse;

  it("It should fetch and load users during initialization.", async () => {
    const params: UserFilterParams = { page: 1 };

    const { result } = renderHook(() => useUsers(params));

    waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockUsers.items);
      expect(result.current.error).toBe(null);
    });
  });

  it("The loadMore function should append newly fetched users to the list", async () => {
    const params: UserFilterParams = { page: 1 };

    const { result } = renderHook(() => useUsers(params));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockUsers.items);
      expect(result.current.error).toBe(null);
    });

    act(() => {
      result.current.loadMore()
    })

    await waitFor(() => {
      expect(result.current.isLoadingMore).toBe(false);
      expect(result.current.data.length).toEqual(2);
      expect(result.current.error).toBe(null);
    });

   
  });
});
