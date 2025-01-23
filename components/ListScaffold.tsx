import { View, Text, FlatList, Pressable } from "react-native";
import { Loading } from "./Loading";
import { JSXElementConstructor, ReactElement } from "react";
import React from "react";

type Props = {
    loading: boolean,
    total: number | null | undefined,
    data: any[],
    paddingBottom: number
    isLoadingMore: boolean
    handleLoadMore: () => void
    renderItem: (item: any) => ReactElement<any, string | JSXElementConstructor<any>> | null
    keyStractor: (item: any, index: number) => string
}

export function ListScaffold({loading, total,keyStractor, data, paddingBottom, handleLoadMore, isLoadingMore, renderItem}: Props){
    return loading ? (
        <View>
            <Loading />
        </View>
        
      ) : (
        <View>
          {total && (
            <View className=" flex-row mx-3 mb-3 justify-end items-end">
              <Text>Total items: </Text>
              <Text className="font-semibold">{total}</Text>
            </View>
          )}
          <FlatList
            data={data}
            contentContainerStyle={{ paddingBottom }}
            
            ItemSeparatorComponent={() => {
              return <View className="m-2"></View>;
            }}
            ListEmptyComponent={() => <View className="items-center"> <Text >No items</Text></View>}
            onEndReachedThreshold={0.3}
            onEndReached={data.length > 5 ? handleLoadMore : null}
            renderItem={({ item }) => {
                return renderItem(item)
            }}
            ListFooterComponent={
              isLoadingMore ? (
                <View style={{ padding: 10 }}>
                  <Loading  />
                </View>
              ) : null
            }
            keyExtractor={(item, index) => keyStractor(item, index)
}
          />
        </View>
      );
}