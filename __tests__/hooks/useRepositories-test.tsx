import { renderHook, act, waitFor } from "@testing-library/react-native";
import { RepositoryFilterParams, RepositorySearchResponse } from "../../models/Repository";
import useRepositories from "../../hooks/UseRepositories";

jest.mock("@/services/GithubService", () => {
  const mock = {
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
  return {
    GithubService: jest.fn().mockImplementation(() => ({
      getRepositories: jest.fn().mockResolvedValue(mock), // Mock del método `getUsers`
    })),
  };
});

jest.mock("react-native", () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn(),
  },
}));

describe("useRepositories validations.", () => {
  const mockUsers = {
    items: [{
        id: 1,
        name: "habib",
        url: "url",
        propietarioId: 2,
        propietarioName: "habib",
        propietarioImageUrl: "image",
        description: "test",
        size: 1,
        isPrivate: false
      },],
    total: 20,
  } as RepositorySearchResponse;
  
  it("It should fetch and load repositories during initialization.", async () => {
    const params: RepositoryFilterParams = { page: 1 };

    const { result } = renderHook(() => useRepositories(params));

    waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockUsers.items);
      expect(result.current.error).toBe(null);
    });
  });

  it("The loadMore function should append newly fetched repositories to the list", async () => {
    const params: RepositoryFilterParams = { page: 1 };

    const { result } = renderHook(() => useRepositories(params));
    
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
