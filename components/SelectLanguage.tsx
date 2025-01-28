import { useTranslation } from "react-i18next";
import { SelectOptions } from "./SelectOptions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Image } from "expo-image";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";


const SupportedLanguages = [
    {
        id: "en-US",
        country:require("@/assets/images/countries/estados-unidos.png"),
    },
    {
        id: "es-MX",
        country:  require("@/assets/images/countries/mexico.png")
    }
]


export function SelectLanguage(){
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;
    const {colors} = useTheme()
    useEffect(() => {
      const loadLanguage = async () => {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      };
      loadLanguage();
    }, [i18n]);
  
    const changeLanguage = async (lang: string) => {
      await AsyncStorage.setItem("language", lang);
      i18n.changeLanguage(lang);
    };



    return  <View>
        <Text className="mb-3" style={{color: colors.text}}>{t("languages.select")}</Text>
        <SelectOptions onClick={(lang) => changeLanguage(lang) } options={SupportedLanguages.map(({id, country}) => ({id: id, value: t(`languages.${id}`), icon: () => <Image  style={{width: 20, height: 20}} source={country} /> }))} selectedOption={currentLanguage} />
        </View>
}