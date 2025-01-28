import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type Props = {
    options?: SelectOptionType[],
    selectedOption: string,
    className?: string,
    onClick: (option: string) => void
}

export type SelectOptionType = {
    id: string,
    value: string,
    icon?: () => React.ReactNode,
}

const test: SelectOptionType[]  = [{
    id: "1",
    value: "test",
    icon: undefined,
    
}]

export function SelectOptions({options = test, selectedOption, className, onClick}: Props){
    return <ScrollView horizontal  className= {` ${className ?? ""}`} >
        {options.map(it => <Option onClick = {onClick} key={it.id} isSelected={selectedOption === it.id} {...it} /> )}
    </ScrollView>
}

function Option({value, id, icon: Icon, isSelected, onClick }: {onClick: (item: string) => void, value: string, isSelected: boolean, id: string, icon?: () => React.ReactNode}){

    return <Pressable onPress={() => onClick(id)} className="flex-row p-3 mr-3 min-w-24 rounded-lg bg-white border-2 border-solid" style={{borderColor: isSelected? "gray": "white"}}>
        {Icon && <View className="mr-3">
            <Icon></Icon>
            </View>}
        <Text className="">{value}</Text>
    </Pressable>
}