jest.mock("expo-font", () => ({
  loadAsync: jest.fn(), // Simula la función loadAsync
  isLoaded: jest.fn(() => true), // Simula que siempre se carga la fuente
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




