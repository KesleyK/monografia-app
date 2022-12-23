import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import { Button, Card, PrimaryTitleGoBack, SearchBar, Text, Wrapper } from "../../components";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";

import { TouchableOpacity } from "react-native-gesture-handler";
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
                    columnWrapperStyle={styles.topicsList}
                    data={topicsList}
                    keyExtractor={topic => topic.id}
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

                <Button title={"Teste"} onPress={async () => {
                    console.log("hmm")
                    await TopicsCollection.testMass({name: "Ciência de Dados", icon: "graph-bar"});
                    await TopicsCollection.testMass({name: "Computação em Nuvem", icon: "cloud"});
                    await TopicsCollection.testMass({name: "Aprendizado de Máquina", icon: "graph-bar"});
                    await TopicsCollection.testMass({name: "Teste grande grandioso", icon: "book"});
                    console.log("massa de teste criada");
                }}/>
            </View>
        </Wrapper>
    );
}
