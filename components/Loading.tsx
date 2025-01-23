import { ActivityIndicator, View } from "react-native";


export function Loading() {
    return  <View><ActivityIndicator testID="loading-indicator" size="large" color={"black"}/></View>
}