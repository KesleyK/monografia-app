import { Text } from "react-native";

import styles from "./styles";

export function PrimaryTitle({ small = false, children }) {
    let titleStyles = { ...styles.primaryTitle };

    if (small) {
        titleStyles = {
            ...titleStyles,
            ...styles.smallTitle
        };
    }

    return <Text style={titleStyles}>{children}</Text>;
}
