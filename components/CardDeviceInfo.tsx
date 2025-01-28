import { View, Text } from "react-native";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

export function CardDeviceInfo() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View
      className=" rounded-md p-5 mt-5"
      style={{ minWidth: 300, minHeight: 150 }}
    >
      <Text
        className="text-center text-xl font-bold"
        style={{ color: colors.text }}
      >
        {t("infoApp.title")}
      </Text>
      <Option
        config={t("infoApp.version")}
        data={process.env.EXPO_PUBLIC_APP_VERSION?.toString() ?? ""}
      />
      <Option
        config={t("infoApp.system")}
        data={Constants.systemVersion?.toString()}
      />
      <Option
        config={t("infoApp.os")}
        data={Constants.platform?.android ? "Android" : "Iphone"}
      />
    </View>
  );
}

function Option({
  config,
  data,
}: {
  config: string;
  data: string | undefined;
}) {
  const { colors } = useTheme();
  return (
    <View className="flex-row items-center mt-3">
      <Text
        className="text-lg font-semibold mr-3"
        style={{ color: colors.text }}
      >
        {config}:
      </Text>
      <Text className="text-md color-gray-500" style={{ color: colors.text }}>
        {data}
      </Text>
    </View>
  );
}
