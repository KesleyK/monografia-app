import { Text } from "react-native";

import styles from "./styles";

export function PrimaryTitle({ children }) {
    return <Text style={styles.primaryTitle}>{children}</Text>;
}
