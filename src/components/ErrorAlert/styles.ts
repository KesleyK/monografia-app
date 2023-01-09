import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    iOSBackdrop: {
        backgroundColor: "#000000",
        opacity: 0.3
    },
    androidBackdrop: {
        backgroundColor: "#232f34",
        opacity: 0.32
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "#FFF",
        width: "80%",
        padding: "5%",
        borderRadius: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    errorTitle: {
        fontWeight: "bold",
        color: "#3D3D3D",
        fontSize: 14,
        width: "80%",
        marginLeft: 5
    },
    buttonContainer: {
        alignItems: "flex-end",
        marginTop: "10%"
    }
});

export default styles;
