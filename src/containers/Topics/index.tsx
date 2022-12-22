import React, { useState } from "react";
import { FlatList, View } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import { Card, PrimaryTitleGoBack, SearchBar, Text, Wrapper } from "../../components";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";

import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

const mockTopics = [
    {
        name: "Ciência de Dados",
        icon: "graph-bar"
    },
    {
        name: "Computação em Nuvem",
        icon: "cloud"
    },
    {
        name: "Aprendizado de Máquina",
        icon: "graph-bar"
    },
    {
        name: "Teste grande grandioso",
        icon: "book"
    }
];

export function Topics({ navigation }) {
    const [searchPhrase, setSearchPhrase] = useState("");

    const topicsList = mockTopics
        .filter((topic) => verifyStringInclusion(normalizeString(topic.name), normalizeString(searchPhrase)));

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                    Tópicos
                </PrimaryTitleGoBack>

                <SearchBar style={styles.searchBar} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

                <FlatList
                    ListEmptyComponent={() => <Text>Nenhum Tópico Encontrado!</Text>}
                    columnWrapperStyle={styles.topicsList}
                    data={topicsList}
                    keyExtractor={topic => topic.name}
                    numColumns={2}
                    renderItem={({ item }) =>
                        <TouchableOpacity >
                            <Card style={styles.topicsCard}>
                                <Foundation name={item.icon} size={80} color="white" />
                                <Text style={styles.topicName}>{item.name}</Text>
                            </Card>
                        </TouchableOpacity>
                    }
                />

            </View>
        </Wrapper>
    );
}
