import { SelectList } from "react-native-dropdown-select-list";
import styles from "./styles";

export function Dropdown({setSelected, values, placeholder, searchEnabled = false}) {
    return (
        <SelectList
            boxStyles={styles.inputBox}
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
    );
}