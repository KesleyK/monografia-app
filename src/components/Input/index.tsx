import { View, TextInput, Text } from "react-native";
import { DefaultStyles } from "../../styles/global";

import styles from "./styles";

export function Input(props) {
    let inputStyle = { ...styles.input };
    let errorComponent;

    if (props.error) {
        inputStyle = { ...inputStyle, ...styles.inputOnError };
        errorComponent = <Text style={styles.errorText}>{props.error}</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={inputStyle}
                placeholder={props.placeholder}
                placeholderTextColor={DefaultStyles.PRIMARY_COLOR}
                onChangeText={props.onChangeText}
                value={props.value}
                autoCapitalize={props.autoCapitalize ?? "none"}
                keyboardType={props.keyboardType ?? "default"}
                secureTextEntry={props.secureTextEntry}
            />
            {errorComponent}
        </View>
    );
}
