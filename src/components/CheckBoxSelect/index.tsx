import { View } from "react-native";
import { CheckBox } from "../CheckBox";
import { Text } from "../Text";
import styles from "./styles";

export function CheckBoxSelect({
    data = [],
    style = {},
    title = null as string,
    onSelection,
    value,
    correctOptions = new Set()
}) {
    return (
        <View style={style}>
            {title && <Text style={styles.title}>{title}</Text>}
            {data.map((item, index) => (
                <CheckBox
                    key={index}
                    onValueChange={() => {
                        value.has(index) ? value.delete(index) : value.add(index);
                        onSelection(new Set([...value].sort()));
                    }}
                    value={value?.has?.(index)}
                    correct={correctOptions.has(index)}
                >
                    {item}
                </CheckBox>
            ))}
        </View>
    );
}