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
    }
});

export default styles;
