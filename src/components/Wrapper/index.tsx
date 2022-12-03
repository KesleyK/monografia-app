import { View, StatusBar } from "react-native";
import { DefaultStyles } from "../../styles";

import styles from "./styles";

export function Wrapper({ children }) {
    return (
        <View style={styles.wrapper}>
            <StatusBar backgroundColor={DefaultStyles.BACKGROUND_COLOR} />
            {children}
        </View>
    );
}
