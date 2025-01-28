import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";

type Params = {
  title: string,
  options: FilterOption[];
  selectedOptionId: string;
  onClick: (optionId: string) => void
};

type FilterOption = {
  id: string;
  label: string;
};

export function FiltersOptions({ options =[{id: "test", label: "teeest"},{id: "test-2", label: "teeest-2"}], title, selectedOptionId, onClick  }: Params) {
  
    return (
    <View className="flex">
      <Text>{title}</Text>

      <ScrollView horizontal>
        {options.map((option) => (
          <Pressable
            key={option.id}
            className="bg-white rounded-md min-width-50 p-3 border-2"
            style={{ minWidth: 30, borderColor: selectedOptionId === option.id ? "gray" : "white" }}
            onPress={() => {onClick(option.id)}}
          >
            <Text>{option.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
