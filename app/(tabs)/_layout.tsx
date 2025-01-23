import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { IconName, Icons } from "../../components/Icons";
export default function TabLayout() {

  return (
    <Tabs
     
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
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
          title: 'Home',
          tabBarIcon: ({ color }) =>  <Icons name={IconName.HOME} size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }) =>  <Icons name={IconName.USERS} size={32} color={color} />,
        }}
      />
        <Tabs.Screen
        name="repositories"
        options={{
          title: 'Repositories',
          tabBarIcon: ({ color }) => <Icons name={IconName.REPOSITORY} size={32} color={color} />,
        }}
      />
    </Tabs>
  );
}