import { act, fireEvent, render, screen } from "@testing-library/react-native";

import useUsers from "../../hooks/UseUsers";
import Users from "../../app/(tabs)/users";
import { User, UserSearchResponse } from "../../models/User";

jest.mock("@/services/GithubService", () => {

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
    })),
  };
});

jest.mock("@/hooks/UseUsers", () => jest.fn());


jest.mock("@react-navigation/bottom-tabs", () => {
  return {
    useBottomTabBarHeight: jest.fn(),
  };
});

describe("Testing users page", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks entre cada prueba
      });
    
    
  it("should render Users component", () => {
    (useUsers as jest.Mock).mockReturnValue({
        data: [],
        loading: false,
        error: null,
        getData: jest.fn(),
        loadMore: jest.fn(),
        isLoadingMore: false,
        openUrl: jest.fn(),
        total: 40,
        isComplete: false,
      })
    render(<Users />);
  
    expect(screen.getByText("Users")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search users...")).toBeTruthy();
  });

  it("should show loading spinner when loading is true", () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      getData: jest.fn(),
      loadMore: jest.fn(),
      isLoadingMore: false,
      openUrl: jest.fn(),
      total: 0,
    });
  
    render(<Users />);
  
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  it("should render users correctly", () => {
    const mockData = [
      {
        id: 1,
        name: "User 1",
        url: "http://user1.com",
        githubName: "habib",
        avatarUrl: "http://repo1.com",
        type: "User",

      },
    ] as User[]
  
    (useUsers as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      getData: jest.fn(),
      loadMore: jest.fn(),
      isLoadingMore: false,
      openUrl: jest.fn(),
      total: 1,
    });
  
    render(<Users />);
  
    expect(screen.getByText("habib")).toBeTruthy();
    expect(screen.getByText("User")).toBeTruthy();
  });

 
  it("should show No items when data is empty", () => {
    (useUsers as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      getData: jest.fn(),
      loadMore: jest.fn(),
      isLoadingMore: false,
      openUrl: jest.fn(),
      total: 0,
    });
  
    render(<Users />);
  
    expect(screen.getByText("No items")).toBeTruthy();
  });
});
