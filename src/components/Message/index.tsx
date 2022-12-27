import { View } from "react-native";
import { Text } from "../Text";
import styles from "./styles";

export function Message({ children, sent = false, style = {} }) {
    const messageStyle = sent ? styles.sent : styles.received;

    return (
        <View style={{ ...styles.container, ...messageStyle, ...style }}>
            <Text>{children}</Text>
        </View>
    );
}