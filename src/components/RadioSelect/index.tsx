import { useState } from "react";
import { View } from "react-native";
import { RadioButton } from "../RadioButton";
import { Text } from "../Text";
import styles from "./styles";

export function RadioSelect({ data = [], style = {}, title = null as string, onSelection }) {
    const [selected, setSelected] = useState(-1);

    return (
        <View style={style}>
            {!title ? null :
                <Text style={styles.title}>{title}</Text>
            }
            {data.map((item, index) => (
                <RadioButton
                    key={index}
                    onPress={() => {
                        setSelected(index);
                        onSelection(index);
                    }}
                    selected={selected === index}
                    name={item}
                />
            ))}
        </View>
    );
}