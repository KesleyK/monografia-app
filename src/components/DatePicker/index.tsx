import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export function DatePicker(props) {
    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: props.date,
            onChange: props.onChange,
            is24Hour: true,
        });
    };

    return (
        <TouchableOpacity style={styles.picker} onPress={showDatePicker}>
            <Text style={styles.placeholder}>{props.placeholder}</Text>
        </TouchableOpacity>
    );
}
