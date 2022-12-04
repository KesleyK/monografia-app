import { Text } from "react-native";

import styles from "./styles";

export function PrimaryTitle({ small = false, style = {}, children }) {
    let titleStyles = { ...styles.primaryTitle, ...style };

    if (small) {
        titleStyles = {
            ...titleStyles,
            ...styles.smallTitle
        };
    }

    return <Text style={titleStyles}>{children}</Text>;
}
