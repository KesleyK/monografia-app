import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: "row",
        backgroundColor: DefaultStyles.PRIMARY_COLOR,
        borderRadius: 20,
        alignItems: "center"
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%"
    },
    searchIcon: {
        marginLeft: -5
    }
});
