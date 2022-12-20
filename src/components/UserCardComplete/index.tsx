import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { DefaultStyles } from "../../styles/global";
import { Text } from "../Text";
import styles from "./styles";

export function UserCardComplete({ user }) {
    return (
        <View>
            <View style={styles.points}>
                <Text>🏆 {user?.points} pontos</Text>
            </View>
            <View style={styles.user}>
                <View style={styles.userLeftBox}>
                    <Ionicons style={styles.userIcon} name="ios-person-circle-sharp" size={50} color="white" />
                </View>
                <View>
                    <Text>{user?.name}</Text>
                    <Text style={{ color: DefaultStyles.SECONDARY_COLOR }}>{user?.email}</Text>
                </View>
            </View>
        </View>
    );
}
