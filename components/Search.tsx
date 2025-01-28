import { TextInput, View } from "react-native"
import useDebounce from "../hooks/UseDebounce";
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";

type Props = {
    placeHolder: string,
    onSearch: (text: string) => void ,
    debounceTime?: number,
}

export default function SearchBar({placeHolder, onSearch, debounceTime = 500}: Props) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, debounceTime); 
  const { colors, dark } = useTheme();
    
    useEffect(() => {
      if (debouncedSearchQuery) {
        onSearch(searchQuery)
      }
    }, [debouncedSearchQuery]);
  
    return <View>
        <TextInput className=" rounded-lg border-2 border-gray-200 p-5" style={{backgroundColor: dark ? "gray" : "white"}}  placeholder={placeHolder} value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)} ></TextInput>
        </View>
}