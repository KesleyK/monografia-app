import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Notifications } from "../Notifications";
import { Text } from "../Text";
import styles from "./styles";

export function UserCardSimple({ user, chat = false, messages = 0 }) {
    return (
        <View style={styles.user}>
            <View style={styles.userLeftBox}>
                <Ionicons style={styles.userIcon} name="ios-person-circle-sharp" size={40} color="white" />
                <Text>{user?.name}</Text>
            </View>

            <View>
                { chat ? (
                    <Notifications number={messages}/>
                ) : (
                    <Text>{user?.points}</Text>
                )}
            </View>
        </View>
    );
}
