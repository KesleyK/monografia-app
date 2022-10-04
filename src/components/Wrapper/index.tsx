import { View } from "react-native";

import styles from "./styles";

export function Wrapper({ children }) {
    return <View style={styles.wrapper}>{children}</View>;
}
