import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "../Text";
import styles from "./styles";

export function UserCardSimple({ user, chat = false }) {
    return (
        <View style={styles.user}>
            <View style={styles.userLeftBox}>
                <Ionicons style={styles.userIcon} name="ios-person-circle-sharp" size={40} color="white" />
                <Text>{user?.name}</Text>
            </View>

            <View>
                { chat ? <Text>Chat</Text> : <Text>{user?.points}</Text>}
                
            </View>
        </View>
    );
}
