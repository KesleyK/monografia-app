import { View } from "react-native";
import { Text } from "../Text";
import styles from "./styles";

export function Notifications({ number }) {
    return (
        <View>
            { number == 0 || (
                <View style={styles.container}><Text>{number}</Text></View>
            )}
        </View>

    );
}