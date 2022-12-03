import React from "react";
import { View } from "react-native";
import { Wrapper, SecondaryTitle, Text, Button } from "../../components";

import styles from "./styles";

export function PreHome({ navigation }) {
    const onGoToGlobalPlatform = () =>  navigation.navigate("BottomTabNavigator");

    return (
        <Wrapper>
            <View style={styles.container}>
                <SecondaryTitle>Escolha a forma como deseja acessar a plataforma</SecondaryTitle>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Plataforma Global</Text>
                    <Text>Aqui você participa da área global. Terá acesso à todas as perguntas públicas da plataforma.</Text>
                    <Button style={styles.cardButton} title="Acessar Área" onPress={onGoToGlobalPlatform} />
                </View>
            </View>
        </Wrapper>
    );
}
