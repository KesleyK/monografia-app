import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export function Button(props) {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={{textTransform: "uppercase", fontWeight: "bold"}}>{props.title}</Text>
        </TouchableOpacity>
    );
}
