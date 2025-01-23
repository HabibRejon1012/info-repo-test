import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { IconName, Icons } from "../../components/Icons";
import { CardDeviceInfo } from "../../components/CardDeviceInfo";
import React from "react";
import { Routes } from "../../consts/Routes";


export default function Index() {
  return (
    <View className="flex-1 p-3 mt-3 justify-center items-center" >
      <View className="items-center">
        <Icons name={IconName.GITHUB} size={54} color="black" />
        <Text className="text-3xl color-gray-800 font-semibold text-center">
        Github Searcher 
        </Text>
        <Text className="text-xl color-gray-500 mt-3">
        What would you like to search for?
        </Text>
      </View>
      <View className="mt-5"></View>
    
      <View className="min-w-60">
        <Link className="text-lg font-medium"href={Routes.USERS} asChild>
          <Pressable className="flex flex-row  p-4 border-gray-400 rounded-lg border justify-between">
            <Icons name={IconName.USERS} size={24} color={"black"} />
            <Text className="text-lg ml-3 x">Users</Text>
            <Icons name={IconName.MENU_RIGHT} size={24} color={"black"} />
          </Pressable>
        </Link>
        <View className=" mt-5"></View>
        <Link className="text-lg font-medium" href={Routes.REPOSITORIES} asChild>
          <Pressable className="flex flex-row p-4 min-w-40 border-gray-400 rounded-lg border justify-between">
            <Icons name={IconName.REPOSITORY} size={24} color={"black"} />
            <Text className="text-lg">Repositories</Text>
            <Icons name={IconName.MENU_RIGHT} size={24} color={"black"} />
          </Pressable>
        </Link>
      </View>

      <View className="mt-5" style={{width: 300}}>
       <CardDeviceInfo />
      </View>
      
    </View>
  );
}
