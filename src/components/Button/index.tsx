import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export function Button(props) {
    let buttonStyle = {
        ...styles.button,
        ...props.style
    };

    if (props.fullWidth) {
        buttonStyle = {
            ...buttonStyle,
            ...styles.fullWidthButton
        };
    }

    return (
        <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    );
}
