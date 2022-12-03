import React, { useState } from "react";
import { View } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import { Wrapper, PrimaryTitle, SearchBar, Text } from "../../components";

import styles from "./styles";

export function Home() {
    const [searchPhrase, setSearchPhrase] = useState("");

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitle>Bem-vindo!</PrimaryTitle>

                <SearchBar style={styles.searchBar} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

                <PrimaryTitle small>Tópicos</PrimaryTitle>

                <View>
                    <Foundation name="graph-bar" size={30} color="white" />
                    <Text>Ciência de Dados</Text>
                </View>
            </View>
        </Wrapper>
    );
}
