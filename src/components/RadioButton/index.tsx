import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";
import styles from "./styles";

export function RadioButton({ selected = false, onPress, name }) {
    let style = styles.selectionBox;

    if (selected) {
        style = {
            ...style,
            ...styles.selected
        }
    }

    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View style={style} />
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}