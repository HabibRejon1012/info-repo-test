import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { IconName, Icons } from "../../components/Icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
export default function TabLayout() {

  const {t} = useTranslation()
  const { colors } = useTheme();
  return (
    <Tabs
     
      screenOptions={{
        tabBarActiveTintColor: colors.text,
      
        tabBarItemStyle: {
            paddingTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1, margin: "auto"
        },
        tabBarStyle: { borderRadius: 12, marginRight: 12, marginLeft: 12, height: 70, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", bottom: 10},
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("home.name"),
          tabBarIcon: ({ color }) =>  <Icons name={IconName.HOME} size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: t("users.title"),
          tabBarIcon: ({ color }) =>  <Icons name={IconName.USERS} size={32} color={color} />,
        }}
      />
        <Tabs.Screen
        name="repositories"
        options={{
          title: t("repositories.title"),
          tabBarIcon: ({ color }) => <Icons name={IconName.REPOSITORY} size={32} color={color} />,
        }}
      />
    </Tabs>
  );
}