import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  Dimensions,
} from "react-native";

import SearchBar from "@/components/Search";
import useRepositories from "../../hooks/UseRepositories";
import { Image } from "expo-image";
import { PageInfoScaffold } from "../../components/PageTemplate";
import { IconName, Icons } from "../../components/Icons";
import { Loading } from "../../components/Loading";
import React from "react";
import { ListScaffold } from "../../components/ListScaffold";

export default function Repositories() {
  const {
    loading,
    error,
    data,
    loadMore,
    isLoadingMore,
    getData,
    openUrl,
    total,
  } = useRepositories({ page: 1, name: "a", perPage: 100 });

  const handleLoadMore = () => {
    console.log("Searching more");
    loadMore();
  };
  const onSearch = (query: string) => {
    console.log("Searching", query);
    getData({ name: query, page: 1 });
  };

  return (
    <PageInfoScaffold
      title="Repositories"
      icon={IconName.REPOSITORY}
      searchBarSection={() => (
        <SearchBar
          onSearch={onSearch}
          placeHolder="Search repositories..."
          debounceTime={800}
        />
      )}
      bodySection={(size) => (
        <ListScaffold
          loading = {loading}
          paddingBottom={size}
          handleLoadMore={handleLoadMore}
          isLoadingMore = {isLoadingMore}
          total={total}
          data={data}
          keyStractor={(item, index) =>
            `${item.id}${index}${item.propietarioId}`
          }
          renderItem={(item) => (
            <Pressable
              className="flex flex-row mx-3 bg-white p-4 rounded-md"
              onPress={() => openUrl(item.url)}
            >
              <View className="flex flex-col ml-3 mr-3 flex-1">
                <View className="flex flex-row items-center">
                  <View
                    className="w-3 h-3 rounded-md mr-3"
                    style={{
                      backgroundColor: item.isPrivate ? "red" : "green",
                    }}
                  ></View>
                  <Text className={"text-xl font-semibold"}>{item.name}</Text>
                </View>

                <Text
                  className={"text-sm mt-3 text-ellipsis text-gray-500"}
                  style={{ maxHeight: 50 }}
                >
                  {item.description}
                </Text>
                <View className="flex flex-row items-center mt-3 ">
                  <Text className="text-sm color-gray-500 mr-3"> Owner:</Text>
                  <Image
                    contentFit={"contain"}
                    style={{ width: 20, height: 20, borderRadius: 40 }}
                    className={"rounded-full"}
                    source={{ uri: item.propietarioImageUrl }}
                  ></Image>
                  <Text className={"text-sm ml-3 text-ellipsis  text-gray-500"}>
                    {item.propietarioName}
                  </Text>
                </View>
              </View>
              <View className=" flex items-center justify-center">
                <Icons name={IconName.MENU_RIGHT} size={24} color="black" />
              </View>
            </Pressable>
          )}
        />
      )}
    />
  );
}
