import { Text, ToastAndroid, TouchableOpacity } from "react-native";

import styles from "./styles";

export function Button({
    style = {},
    fullWidth = false,
    onPress,
    title,
    disabled = false,
    softDisabled = false,
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

    if (disabled || softDisabled) {
        buttonStyle = {
            ...buttonStyle,
            ...styles.disabled
        }

        onPress = () => {
            ToastAndroid.show(disabledMessage, ToastAndroid.LONG);
        }
    }

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled} >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}
