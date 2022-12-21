import React from "react";
import { Modal, Pressable, View, Platform, ActivityIndicator } from "react-native";
import { DefaultStyles } from "../../styles/global";

import styles from "./styles";

export function LoadingIndicator({ visibleBackdrop = false }) {
    const pressableStyle = [Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop];

    if (visibleBackdrop) {
        pressableStyle.push(styles.visibleBackdrop);
    }

    return (
        <View>
            <Modal transparent={true}>
                <Pressable style={pressableStyle} />
                <View style={styles.modalContainer}>
                    <ActivityIndicator color={DefaultStyles.ANCHOR_COLOR} />
                </View>
            </Modal>
        </View>
    );
}
