import React from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DefaultStyles } from "../../styles/global";
import { Button } from "../Button";

import styles from "./styles";

export function ConfirmationAlert({ confirmationMessage, onCancel, onConfirm }) {
    return (
        <View>
            <Modal animationType="fade" transparent={true}>
                <Pressable
                    style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]}
                    onPress={onCancel}
                />
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleContainer}>
                            <MaterialIcons name="error" size={35} color={DefaultStyles.ERROR_COLOR} />
                            <Text style={styles.title}>{confirmationMessage}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} title="Cancelar" onPress={onCancel} />
                            <Button style={styles.button} title="Confirmar" onPress={onConfirm} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
