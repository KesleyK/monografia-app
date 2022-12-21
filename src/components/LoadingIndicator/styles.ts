import { StyleSheet } from "react-native";
import { DefaultStyles } from "../../styles/global";

const styles = StyleSheet.create({
    iOSBackdrop: {
        opacity: 0.3
    },
    androidBackdrop: {
        opacity: 0.32
    },
    backdrop: {
        backgroundColor: DefaultStyles.BACKGROUND_COLOR,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    visibleBackdrop: {
        backgroundColor: DefaultStyles.BACKGROUND_COLOR,
        opacity: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default styles;
