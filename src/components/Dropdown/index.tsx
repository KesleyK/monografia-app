import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import styles from "./styles";

export function Dropdown({ setSelected, values, placeholder, searchEnabled = false, error = "" }) {
    let inputBoxStyle = { ...styles.inputBox };
    let errorComponent;

    if (error) {
        inputBoxStyle = { ...inputBoxStyle, ...styles.inputBoxOnError };
        errorComponent = <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <SelectList
                boxStyles={inputBoxStyle}
                inputStyles={styles.placeholder}
                dropdownStyles={styles.dropdown}
                dropdownItemStyles={styles.dropdownItem}
                dropdownTextStyles={styles.dropdownItemText}
                setSelected={setSelected}
                data={values}
                save="value"
                search={searchEnabled}
                placeholder={placeholder}
            />
            {errorComponent}
        </View>
    );
}
