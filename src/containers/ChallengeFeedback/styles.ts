import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    container: {
        paddingHorizontal: "7%",
        paddingTop: "10%"
    },
    title: {
        marginBottom: "10%"
    },
    subtitle: {
        marginBottom: "5%"
    },
    generalFeedback: {
        marginBottom: "10%"
    },
    generalFeedbackContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    individualFeedback: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "5%"
    },
    correct: {
        color: DefaultStyles.SUCCESS_COLOR
    },
    incorrect: {
        color: DefaultStyles.ERROR_COLOR
    },
    reviewButton: {
        marginBottom: "5%"
    },
    textBold: {
        fontWeight: "bold"
    },
    rate: {
        marginBottom: "2%"
    },
    resultsContainer: {
        alignSelf: "center",
        backgroundColor: DefaultStyles.BACKGROUND_COLOR,
        borderRadius: 65,
        padding: 20
    },
    results: {
        fontSize: 24,
        color: DefaultStyles.SUCCESS_COLOR
    },
    numberResults: {
        textAlign: "center",
        fontSize: 36,
        color: DefaultStyles.SUCCESS_COLOR
    }
});