import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: "10%"
    },
    title: {
        marginBottom: "15%"
    },
    userHelpersBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15%"
    },
    userHelpersRememberMeBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    userHelpersRememberMeText: {
        fontWeight: "bold"
    },
    signupBox: {
        flexDirection: "row",
        alignSelf: "center"
    },
    signupText: {
        fontSize: 11
    }
});
