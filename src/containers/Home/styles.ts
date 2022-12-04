import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingHorizontal: "7%",
        paddingTop: "20%",
        paddingBottom: "25%",
    },
    title: {
        marginBottom: "20%"
    },
    smallTitle: {
        marginBottom: "6%"
    },
    searchBar: {
        marginBottom: "8%"
    },
    topicsBox: {
        marginBottom: "20%"
    },
    topicsList: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    topicsCard: {
        alignItems: "center",
        width: "33%",
        padding: "2%"
    },
    topicName: {
        fontSize: 12,
        textAlign: "center",
        marginTop: "5%"
    },
    rankingCard: {
        padding: "2%",
        marginBottom: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rankingCardLeftBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    rankingCardIcon: {
        marginRight: "2%"
    }
});