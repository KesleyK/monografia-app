import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

const RADIO_COLOR = DefaultStyles.PRIMARY_COLOR;

export default StyleSheet.create({
    item: {
        flexDirection: "row",
        marginVertical: 5
    },
    selectionBox: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: RADIO_COLOR,
        marginRight: 10
    },
    selected: {
        backgroundColor: RADIO_COLOR
    },
    correctBox: {
        borderColor: "green"
    },
    correctText: {
        color: "green"
    }
});