import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export enum IconName {
    HOME = "home",
    REPOSITORY = "source-repository",
    GITHUB = "github",
    USERS = "account-box-multiple",
    MENU_RIGHT = "menu-right"
}

type Props = {
    name: IconName,
    color: string,
    size: number
}


 export function Icons({name, color = "black", size = 32}: Props) {
    return <MaterialCommunityIcons name={name} size={size} color={color} />
 }