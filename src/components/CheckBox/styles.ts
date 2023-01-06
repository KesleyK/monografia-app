import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

const CHECKBOX_COLOR = DefaultStyles.PRIMARY_COLOR;

export default StyleSheet.create({
    item: {
        flexDirection: "row",
        marginVertical: 5
    },
    selectionBox: {
        height: 24,
        width: 24,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: CHECKBOX_COLOR,
        marginRight: 10
    },
    selected: {
        backgroundColor: CHECKBOX_COLOR
    },
    correctBox: {
        borderColor: "green"
    },
    correctText: {
        color: "green"
    }
});