import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { IconName, Icons } from "./Icons";

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

  return (
    <View className=" flex-1">
      <View className="p-3">
        <View className="mb-4  mt-4 flex flex-row justify-center items-center">
          <Icons name={icon} size={32} color={"black"} />

          <Text className="ml-2  text-2xl font-semibold">{title}</Text>
        </View>

        {searchBarSection && <View className="mb-4">{searchBarSection()}</View>}
      </View>

      {bodySection && bodySection(tabBarHeight + 20)}
    </View>
  );
}
