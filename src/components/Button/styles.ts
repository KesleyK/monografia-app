import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    button: {
        backgroundColor: DefaultStyles.BUTTON_COLOR,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    fullWidthButton: {
        width: "100%"
    },
    title: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: DefaultStyles.BUTTON_TEXT_COLOR
    }, disabled: {
        backgroundColor: DefaultStyles.DISABLED_COLOR
    }
});
