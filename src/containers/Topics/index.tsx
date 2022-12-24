import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import { Button, Card, PrimaryTitleGoBack, SearchBar, Text, Wrapper } from "../../components";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";
import styles from "./styles";
import TopicsCollection from "../../services/firebase/db/topics";
import { ITopic } from "../../models/ITopic";

export function Topics({ navigation }) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        TopicsCollection.getAll().then((topicsInfo) => {
            const arrTopics = [];

            topicsInfo.forEach((doc) => {
                const info = doc.data();
                arrTopics.push({ id: doc.id, name: info?.name, icon: info?.icon });
            });

            setTopics(arrTopics);
        });
    }, []);

    const topicsList = topics?.filter((topic) => {
        return verifyStringInclusion(normalizeString(topic.name), normalizeString(searchPhrase));
    });

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                    Tópicos
                </PrimaryTitleGoBack>

                <SearchBar style={styles.searchBar} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

                <FlatList
                    ListEmptyComponent={() => <Text>Nenhum Tópico Encontrado!</Text>}
                    contentContainerStyle={styles.flatList}
                    data={topicsList}
                    keyExtractor={(topic) => topic.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <TouchableOpacity>
                                <Card style={styles.card}>
                                    <Foundation name={item.icon} size={80} color="white" />
                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <Button
                    title={"Teste"}
                    onPress={async () => {
                        console.log("hmm");
                        await TopicsCollection.testMass({ name: "Ciência de Dados", icon: "graph-bar" });
                        await TopicsCollection.testMass({ name: "Computação em Nuvem", icon: "cloud" });
                        await TopicsCollection.testMass({ name: "Aprendizado de Máquina", icon: "graph-bar" });
                        await TopicsCollection.testMass({ name: "Linguagens de Programação", icon: "book" });
                        console.log("massa de teste criada");
                    }}
                />
            </View>
        </Wrapper>
    );
}
