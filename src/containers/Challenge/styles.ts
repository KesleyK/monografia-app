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
    body: {
        marginBottom: "10%"
    },
    answer: {
        marginBottom: "1%"
    },
    answerOptions: {
        paddingRight: 20
    },
    links: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "10%"
    },
    buttonsContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: 110,
        marginBottom: "10%"
    },
    textFeedbackReview: {
        marginBottom: "3%"
    },
    correct: {
        color: DefaultStyles.SUCCESS_COLOR
    },
    incorrect: {
        color: DefaultStyles.ERROR_COLOR
    },
    longFeedback: {
        marginTop: 5,
        backgroundColor: DefaultStyles.BACKGROUND_COLOR,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});