import { TextInput, View } from "react-native"
import useDebounce from "../hooks/UseDebounce";
import { useEffect, useState } from "react";

type Props = {
    placeHolder: string,
    onSearch: (text: string) => void ,
    debounceTime?: number,
}

export default function SearchBar({placeHolder, onSearch, debounceTime = 500}: Props) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, debounceTime); 
  
    
    useEffect(() => {
      if (debouncedSearchQuery) {
        onSearch(searchQuery)
      }
    }, [debouncedSearchQuery]);
  
    return <View>
        <TextInput className="bg-white rounded-lg border-2 border-gray-200 p-5"  placeholder={placeHolder} value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)} ></TextInput>
        </View>
}