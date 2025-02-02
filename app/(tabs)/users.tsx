import { FlatList, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import SearchBar from "@/components/Search";
import useUsers from "@/hooks/UseUsers";
import { PageInfoScaffold } from "../../components/PageTemplate";
import { IconName, Icons } from "../../components/Icons";
import { Loading } from "../../components/Loading";
import { ListScaffold } from "../../components/ListScaffold";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";

export default function Users() {
  const {t } = useTranslation()
  const {colors} = useTheme()
  const {
    loading,
    error,
    data,
    total,
    loadMore,
    isLoadingMore,
    getData,
    openUrl,
  } = useUsers({ page: 1, name: "a" });

  const handleLoadMore = () => {
    loadMore();
  };
  const onSearch = (query: string) => {
    getData({ name: query, page: 1 });
  };

  return (
    <PageInfoScaffold
      title={t("users.title")}
      icon={IconName.USERS}
      searchBarSection={() => (
        <SearchBar
          onSearch={onSearch}
          placeHolder={`${t("users.search")}...`}
          debounceTime={500}
        />
      )}
      bodySection={(size) => {
        return (
       
<ListScaffold
            loading={loading}
            paddingBottom={size}
            handleLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            total={total}
            data={data}
            keyStractor={(item, index) =>
              `${item.id}${index}${item.propietarioId}`
            }
            renderItem={(item) => (
              <Pressable
                className="flex flex-row mx-3 bg-white p-4 rounded-md border-2 border-solid"
                style={{backgroundColor: colors.background, borderColor: colors.border}}
                onPress={() => openUrl(item.url)}
              >
                <Image
                  contentFit={"contain"}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  className={"rounded-full"}
                  source={{ uri: item.avatarUrl }}
                ></Image>
                <View className="flex flex-col ml-3 mr-3 flex-1">
                  <Text className={"text-xl font-semibold"}  style={{color: colors.text}}>
                    {item.githubName}
                  </Text>
                  <Text className={"text-md color-gray-500" } style={{color: colors.text}}>
                    {item.type === "User"? "User" : "Organization"}
                  </Text>
                </View>
                <View className=" flex items-center justify-center">
                  <Icons name={IconName.MENU_RIGHT} size={24} color={colors.text} />
                </View>
              </Pressable>
            )}
          />
      
         
        );
      }}
    />
  );
}
