import { act, fireEvent, render, screen } from "@testing-library/react-native";
import Repositories from "../../app/(tabs)/repositories";
import { RepositorySearchResponse } from "../../models/Repository";
import useRepositories from "@/hooks/UseRepositories";


jest.mock("@react-navigation/native", () => ({
    useTheme: jest.fn().mockReturnValue({dark: false,
      colors: {
        primary: 'rgb(0, 122, 255)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
      },
      fonts: null,}),
  }));

  jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, any> = {
          "repositories.search": "Search repositories",
          "searcher.noItems": "No items",
        };
        return translations[key] || key; // Devuelve la traducción o la clave como fallback
      },
      i18n: {
        changeLanguage: jest.fn(),
      },
    }),
    Trans: jest.fn(({ children }) => children), // Si usas <Trans>, lo renderiza directamente
  }));

jest.mock("@/hooks/UseRepositories", () => jest.fn());
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
        isPrivate: false,
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

jest.mock("@react-navigation/bottom-tabs", () => {
  return {
    useBottomTabBarHeight: jest.fn(),
  };
});

describe("Testing repositories page", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks entre cada prueba
      });
    
    
  it("should render Repositories component", () => {
    (useRepositories as jest.Mock).mockReturnValue({
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
    render(<Repositories />);
  
    expect(screen.getByPlaceholderText("Search repositories...")).toBeTruthy();
  });

  it("should show loading spinner when loading is true", () => {
    (useRepositories as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      getData: jest.fn(),
      loadMore: jest.fn(),
      isLoadingMore: false,
      openUrl: jest.fn(),
      total: 0,
    });
  
    render(<Repositories />);
  
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  it("should render repositories correctly", () => {
    const mockData = [
      {
        id: 1,
        name: "Repo 1",
        url: "http://repo1.com",
        propietarioId: 2,
        propietarioName: "User 1",
        propietarioImageUrl: "http://image.com",
        description: "Test Repo",
        size: 123,
        isPrivate: false,
      },
    ];
  
    (useRepositories as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      getData: jest.fn(),
      loadMore: jest.fn(),
      isLoadingMore: false,
      openUrl: jest.fn(),
      total: 1,
    });
  
    render(<Repositories />);
  
    expect(screen.getByText("Repo 1")).toBeTruthy();
    expect(screen.getByText("Test Repo")).toBeTruthy();
    expect(screen.getByText("Owner:")).toBeTruthy();
  });

 
  it("should show No items when data is empty", () => {
    (useRepositories as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      getData: jest.fn(),
      loadMore: jest.fn(),
      isLoadingMore: false,
      openUrl: jest.fn(),
      total: 0,
    });
  
    render(<Repositories />);
  
    expect(screen.getByText("No items")).toBeTruthy();
  });
});
