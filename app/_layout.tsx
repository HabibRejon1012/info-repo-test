import "../global.css";
import { Stack } from "expo-router";
import "@/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const scheme = useColorScheme(); // 'dark' o 'light'

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#222222",
      text: "#FFFFFF",
      border: "rgb(61, 68, 77)"
    },
  };

  const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#3498db",
      background: "#ffffff",
    },
  };

  const theme = scheme === "dark" ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        {
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          ></Stack.Screen>
        }
      </Stack>
      ;
    </ThemeProvider>
  );
}
