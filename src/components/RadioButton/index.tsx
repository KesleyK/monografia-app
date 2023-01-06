import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";
import styles from "./styles";

export function RadioButton({ selected = false, onPress, content, correct = false }) {
    let style = {
        ...styles.selectionBox,
        ...(selected ? styles.selected : {}),
        ...(correct ? styles.correctBox : {}),
    }

    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View style={style} />
            <Text style={correct ? styles.correctText : {}}>{content}</Text>
        </TouchableOpacity>
    );
}