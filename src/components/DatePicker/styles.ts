import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    picker: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 23,
        marginBottom: 10,
        justifyContent: "center"
    },
    pickerOnError: {
        color: "#000",
        backgroundColor: DefaultStyles.ERROR_COLOR
    },
    placeholder: {
        color: DefaultStyles.PLACEHOLDER_COLOR
    },
    errorText: {
        position: "absolute",
        bottom: 2,
        left: 6,
        fontSize: 10,
        color: DefaultStyles.ERROR_COLOR_LIGHT,
        fontWeight: "bold"
    }
});
