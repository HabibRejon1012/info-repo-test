import { Link, Stack } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { IconName, Icons } from "../../components/Icons";
import { CardDeviceInfo } from "../../components/CardDeviceInfo";
import React from "react";
import { Routes } from "../../consts/Routes";
import { useTranslation } from "react-i18next";
import { SelectLanguage } from "../../components/SelectLanguage";
import { useTheme } from "@react-navigation/native";

export default function Index() {
  const { t } = useTranslation();
  const {colors} = useTheme()
  return (
    <View className="flex-1 p-3 mt-3  items-center bg-primary">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full m-3">
        <SelectLanguage />
      </View>
      <View className="mt-5">
        <View className="items-center">
          <Icons name={IconName.GITHUB} size={54} color={colors.text} />
          <Text className="text-3xl text-color-primary font-semibold text-center" style={{color: colors.text}}>
            {t("home.title")}
          </Text>
          <Text className="text-xl  mt-3"  style={{color: colors.text}}>
            {t("home.description")}
          </Text>
        </View>

        <View className="mt-5"></View>

        <View className="min-w-60">
          <Link className="text-lg font-medium" href={Routes.USERS} asChild>
            <Pressable className="flex flex-row  p-4 border-gray-400 rounded-lg border justify-between">
              <Icons name={IconName.USERS} size={24} color={colors.text} />
              <Text className="text-lg ml-3 "  style={{color: colors.text}}>{t("users.title")}</Text>
              <Icons name={IconName.MENU_RIGHT} size={24} color={colors.text} />
            </Pressable>
          </Link>
          <View className=" mt-5"></View>
          <Link
            className="text-lg font-medium"
            href={Routes.REPOSITORIES}
            asChild
          >
            <Pressable className="flex flex-row p-4 min-w-40 border-gray-400 rounded-lg border justify-between">
              <Icons name={IconName.REPOSITORY} size={24} color={colors.text} />
              <Text className="text-lg"  style={{color: colors.text}}>{t("repositories.title")}</Text>
              <Icons name={IconName.MENU_RIGHT} size={24} color={colors.text} />
            </Pressable>
          </Link>
        </View>

        <View className="mt-5" style={{ width: 300 }}>
          <CardDeviceInfo />
        </View>
      </View>
    </View>
  );
}
