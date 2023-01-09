import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

export default StyleSheet.create({
    container: {
        marginTop: "10%",
        marginHorizontal: "8%"
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10
    },
    cardButton: {
        marginTop: "10%",
        borderRadius: 10,
        width: "90%"
    },
    logout: {
        marginTop: "10%",
        textAlign: "center"
    },
    bottomLinksContainer: {
        marginTop: "40%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    bottomLink: {
        color: DefaultStyles.SECONDARY_COLOR
    }
});
