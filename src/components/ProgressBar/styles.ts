import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    bar: {
        width: "100%",
        height: 20,
        backgroundColor: DefaultStyles.SECONDARY_COLOR
    },
    filled: {
        height: "100%",
        backgroundColor: DefaultStyles.ANCHOR_COLOR
    },
    subject: {
        fontSize: 10
    }
});