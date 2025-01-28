import { render, screen } from '@testing-library/react-native';
import Index from '../../app/(tabs)';

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
}))
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, any> = {
          "home.title": "Github Searcher",
          "home.description": "What would you like to search for?",
          "repositories.title": "Repositories",
          "users.title": "Users",
        };
        return translations[key] || key; // Devuelve la traducción o la clave como fallback
      },
      i18n: {
        changeLanguage: jest.fn(),
      },
    }),
    Trans: jest.fn(({ children }) => children), // Si usas <Trans>, lo renderiza directamente
  }));


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





describe("Testing home page", () => {

    it("Render home correctly.", () => {
        render(<Index />)
       expect(screen.getByText("Github Searcher")).toBeTruthy();
       expect(screen.getByText("What would you like to search for?")).toBeTruthy();
       expect(screen.getByText("Repositories")).toBeTruthy();
       expect(screen.getByText("Users")).toBeTruthy();
    })

})