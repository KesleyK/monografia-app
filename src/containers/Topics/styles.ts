import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingHorizontal: "7%",
        paddingTop: "20%",
        paddingBottom: "25%"
    },
    title: {
        marginBottom: "10%"
    },
    searchBar: {
        marginBottom: "8%"
    },
    topicsList: {
        justifyContent: "space-evenly",
        alignItems: "stretch"
    },
    topicsCard: {
        flexDirection: "column",
        marginBottom: "10%",
        alignItems: "center",
        padding: "3%",
        width: 150 // TODO: Responsiveness...
    },
    topicName: {
        fontSize: 12,
        textAlign: "center",
        marginTop: "5%",
        width: "80%"
    }
});
