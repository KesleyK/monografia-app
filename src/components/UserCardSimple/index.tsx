import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Notifications } from "../Notifications";
import { Text } from "../Text";
import styles from "./styles";

export function UserCardSimple({ user, chat = false, messages = 0, onPress = null }) {
    const innerContent = (
        <View style={styles.user}>
            <View style={styles.userLeftBox}>
                <Ionicons style={styles.userIcon} name="ios-person-circle-sharp" size={40} color="white" />
                <Text>{user?.name}</Text>
            </View>

            <View>
                {chat ?
                    <Notifications number={messages} /> :
                    <Text>{user?.points}</Text>
                }
            </View>
        </View>
    )

    return (
        <View>
            {onPress ?
                <TouchableOpacity onPress={onPress}>{innerContent}</TouchableOpacity> :
                <View>{innerContent}</View>
            }
        </View>
    );
}
