import { View, Text } from "react-native";
import Constants from 'expo-constants';

export function CardDeviceInfo() {
     return <View className="bg-white rounded-md p-5 mt-5" style={{minWidth: 300, minHeight: 150}}>
              <Text className="text-center text-xl font-bold"> App Info:</Text>
                <Option config="App version:" data={process.env.EXPO_PUBLIC_APP_VERSION?.toString() ?? ""}/>
                <Option config="System version:" data={Constants.systemVersion?.toString()}/>
                <Option config="Is android:" data={Constants.platform?.android ? "True" : "False"}/>
                <Option config="Is ios:" data={Constants.platform?.ios? "True" : "False"}/>
            
          </View>
    
}


function Option({config, data}: {config: string, data: string | undefined}) {
    return   <View className="flex-row items-center mt-3">
      <Text className="text-lg font-semibold mr-3">{config}</Text>
      <Text className="text-md color-gray-500">{data}</Text>
    </View>
}