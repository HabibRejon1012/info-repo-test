import { useTheme } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";


export function Loading() {
    const { colors, dark } = useTheme();
    return  <View><ActivityIndicator testID="loading-indicator" size="large" color={dark ? "white" : "black"}/></View>
}