import React from "react";
import { Modal, Text, Pressable, View, Platform, Button } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DefaultStyles } from "../../styles/global";

import styles from "./styles";

export function ErrorAlert({ errorMessage, onClosedModal }) {
    return (
        <View>
            <Modal animationType="fade" transparent={true}>
                <Pressable
                    style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]}
                    onPress={onClosedModal}
                />
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleContainer}>
                            <MaterialIcons name="error" size={35} color={DefaultStyles.ANCHOR_COLOR} />
                            <Text style={styles.errorTitle}>{errorMessage}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button color={DefaultStyles.ANCHOR_COLOR} title="Fechar" onPress={onClosedModal} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
