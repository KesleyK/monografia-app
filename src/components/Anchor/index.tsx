import { Text } from "react-native";
import styles from "./styles";

export function Anchor(props) {
    return (
        <Text style={styles.link} onPress={props.onPress}>{props.children}</Text>
    );
}
