import { Text, ToastAndroid, TouchableOpacity } from "react-native";

import styles from "./styles";

export function Button({
    style = {},
    fullWidth = false,
    onPress,
    title,
    disabled = false,
    disabledMessage = "Ação bloqueada" 
}) {
    let buttonStyle = {
        ...styles.button,
        ...style
    };

    if (fullWidth) {
        buttonStyle = {
            ...buttonStyle,
            ...styles.fullWidthButton
        };
    }

    if (disabled) {
        buttonStyle = {
            ...buttonStyle,
            ...styles.disabled
        }

        onPress = () => {
            ToastAndroid.show(disabledMessage, ToastAndroid.LONG);
        }
    }

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}
