import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    container: {
        marginTop: "10%",
        marginHorizontal: "8%"
    },
    messagesContainer: {
        height: "90%",
        paddingBottom: "30%"
    },
    noMessagesFound: {
        color: DefaultStyles.SECONDARY_COLOR
    },
    messageInputBox: {
        borderRadius: 15,
        position: "absolute",
        marginHorizontal: "10%",
        marginBottom: "7%",
        backgroundColor: "#555",
        alignSelf: "center",
        bottom: 5,
        width: "95%",
        maxHeight: 150,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    messageInput: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        textAlignVertical: "top",
        color: DefaultStyles.PRIMARY_COLOR,
        paddingRight: 50
    },
    send: {
        position: "absolute",
        right: 3,
        bottom: 3,
        backgroundColor: DefaultStyles.ANCHOR_COLOR,
        borderRadius: 100,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});