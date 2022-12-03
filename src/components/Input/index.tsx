import { TextInput } from "react-native";
import { DefaultStyles } from "../../styles";

import styles from "./styles";

export function Input(props) {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor={DefaultStyles.PRIMARY_COLOR}
            onChangeText={props.onChangeText}
            value={props.value}
            autoCapitalize={props.autoCapitalize ?? "none"}
            keyboardType={props.keyboardType ?? "default"}
            secureTextEntry={props.secureTextEntry}
        />
    );
}
