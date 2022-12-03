import { View, StatusBar } from "react-native";
import { DefaultStyles } from "../../styles/global";

import styles from "./styles";

export function Wrapper({ children }) {
    return (
        <View style={styles.wrapper}>
            <StatusBar backgroundColor={DefaultStyles.BACKGROUND_COLOR} />
            {children}
        </View>
    );
}
