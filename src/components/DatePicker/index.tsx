import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export function DatePicker(props) {
    let pickerStyle = { ...styles.picker };
    let errorComponent;

    if (props.error) {
        pickerStyle = { ...pickerStyle, ...styles.pickerOnError };
        errorComponent = <Text style={styles.errorText}>{props.error}</Text>;
    }

    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: props.date ?? new Date(),
            onChange: props.onChange,
            is24Hour: true,
            maximumDate: props.maximumDate
        });
    };

    return (
        <TouchableOpacity style={pickerStyle} onPress={showDatePicker}>
            <Text style={styles.placeholder}>{props.placeholder}</Text>
            {errorComponent}
        </TouchableOpacity>
    );
}
