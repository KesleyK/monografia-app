import { Text } from "react-native";

import styles from "./styles";

export function SecondaryTitle({ children }) {
    return <Text style={styles.secondaryTitle}>{children}</Text>;
}
