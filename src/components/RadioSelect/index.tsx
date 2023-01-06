import { useState } from "react";
import { View } from "react-native";
import { RadioButton } from "../RadioButton";
import { Text } from "../Text";
import styles from "./styles";

export function RadioSelect({
    data = [],
    style = {},
    title = null as string,
    onSelection,
    value,
    correctOption = -1
}) {
    return (
        <View style={style}>
            {!title ? null :
                <Text style={styles.title}>{title}</Text>
            }
            {data.map((item, index) => (
                <RadioButton
                    key={index}
                    onPress={() => onSelection(index)}
                    selected={value === index}
                    content={item}
                    correct={index === correctOption}
                />
            ))}
        </View>
    );
}