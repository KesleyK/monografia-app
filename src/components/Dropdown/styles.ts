import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    container: {
        position: "relative",
        marginBottom: 10
    },
    inputBox: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 23,
        textAlignVertical: "center",
        borderWidth: 0
    },
    inputBoxOnError: {
        color: "#000",
        backgroundColor: DefaultStyles.ERROR_COLOR
    },
    errorText: {
        position: "absolute",
        bottom: 2,
        left: 6,
        fontSize: 10,
        color: DefaultStyles.ERROR_COLOR_LIGHT,
        fontWeight: "bold"
    },
    placeholder: {
        color: DefaultStyles.CARD_COLOR
    },
    dropdown: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        width: "100%",
        marginBottom: 25,
        borderRadius: 5
    },
    dropdownItem: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        marginLeft: "5%",
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: DefaultStyles.BACKGROUND_COLOR
    },
    dropdownItemText: {
        color: DefaultStyles.PRIMARY_COLOR
    }
});
