jest.mock("expo-font", () => ({
  loadAsync: jest.fn(), // Simula la función loadAsync
  isLoaded: jest.fn(() => true), // Simula que siempre se carga la fuente
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: jest.fn(({ children }) => children),
  SafeAreaView: jest.fn(({ children }) => children),
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })),
}));
const mockStackScreen = jest.fn(() => null);
mockStackScreen.displayName = "Stack.Screen";

const mockLinkScreen = jest.fn(({children}) => <>{children}</>);
mockLinkScreen.displayName = "Link";

jest.mock("expo-router", () => ({
  Stack: {
    Screen: mockStackScreen,
  
  },
  Link: mockLinkScreen, 
}));

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  return {
    ...jest.requireActual("@expo/vector-icons"),
    createIconSet: jest.fn(() => Text), // Simula los iconos como texto simple
  };
});


jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn()
}))




