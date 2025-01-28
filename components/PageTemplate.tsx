import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { IconName, Icons } from "./Icons";
import { Stack } from "expo-router";
import { SelectLanguage } from "./SelectLanguage";
import { useTheme } from "@react-navigation/native";

type Props = {
  title: string;
  icon: IconName;
  searchBarSection?: () => React.ReactNode;
  bodySection?: (tabSize: number) => React.ReactNode;
};

export function PageInfoScaffold({
  title,
  icon,
  searchBarSection,
  bodySection,
}: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const { colors, dark } = useTheme();

  return (
    <View className=" flex-1  mt-3" style={{backgroundColor: colors.background, }}>
      <Stack.Screen 
        options={
          {
            title,
            headerTintColor: colors.text,
            headerLeft: () => <View className="px-3"><Icons  name={icon} color={colors.text} size={30} /></View>
          }
        }
      />
   
     
      <View className="p-3">
        {searchBarSection && <View className="mb-4">{searchBarSection()}</View>}
      </View>

      {bodySection && bodySection(tabBarHeight + 20)}
    </View>
  );
}
