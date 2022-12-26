import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        marginTop: "10%",
        marginHorizontal: "8%"
    },
    messagesContainer: {
        height: "90%"
    },
    messageInputBox: {
        borderRadius: 15,
        position: "absolute",
        marginHorizontal: "10%",
        marginBottom: "7%",
        backgroundColor: "#555",
        alignSelf: "center",
        top: "80%",
        width: "90%",
        height: "17%"
    },
    messageInput: {
        height: "100%",
        padding: 8,
        textAlignVertical: "top",
        color: "white"
    }
});