import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";
import styles from "./styles";

export function CheckBox({ value, onValueChange, children, correct = false }) {
    let style = {
        ...styles.selectionBox,
        ...(value ? styles.selected : {}),
        ...(correct ? styles.correctBox : {}),
    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => onValueChange(!value)}>
            <View style={style} />
            <Text style={correct ? styles.correctText : {}}>{children}</Text>
        </TouchableOpacity>
    );
}