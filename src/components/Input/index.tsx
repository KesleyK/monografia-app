import { TextInput } from "react-native";

import styles from "./styles";

export function Input(props) {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            value={props.value}
        />
    );
}
