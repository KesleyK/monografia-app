import Ionicons from "@expo/vector-icons/build/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { PrimaryTitle } from "../PrimaryTitle";

import styles from "./styles";

export function PrimaryTitleGoBack({ iconSize = 30, small = false, style = {}, children, onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name="arrow-back" size={iconSize} color="white" style={styles.goBack}></Ionicons>
            </TouchableOpacity>
            <PrimaryTitle small={small} style={style}>{children}</PrimaryTitle>
        </View>
    );
}
