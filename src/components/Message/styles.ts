import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    container: {
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        maxWidth: "85%",
    },
    received: {
        backgroundColor: DefaultStyles.SECONDARY_COLOR,
        alignSelf: "flex-start",
    },
    sent: {
        backgroundColor: "#555",
        alignSelf: "flex-end",
    }
});
