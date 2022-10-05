import React from "react"
import { Platform, Keyboard, KeyboardAvoidingView as KAV, TouchableWithoutFeedback } from "react-native"

export function KeyboardAvoidingView({ children }) {
    return (
        <KAV
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </KAV>
    );
}
