import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Card, LoadingIndicator, PrimaryTitleGoBack, SearchBar, Text, Wrapper } from "../../components";
import { parseCollection } from "../../helpers/collectionUtils";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";
import TopicsCollection from "../../services/firebase/db/topics";
import createTopics from "../../temp/createTopics";
import styles from "./styles";

export function TopicList({ navigation }) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [topics, setTopics] = useState([]);
    const [requestDone, setRequestDone] = useState(false);

    useEffect(() => {
        TopicsCollection.getAll().then((topicsInfo) => {
            setTopics(parseCollection(topicsInfo));
            setRequestDone(true);
        });
    }, []);

    const topicsList = topics?.filter((topic) => {
        return verifyStringInclusion(normalizeString(topic.name), normalizeString(searchPhrase));
    });

    const onRender = ({ item }) => (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Topic", item)}>
                <Card style={styles.card}>
                    <MaterialCommunityIcons name={item.icon} size={80} color="white" />
                    <Text style={styles.cardTitle}>{item.name}</Text>
                </Card>
            </TouchableOpacity>
        </View>
    );

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                    Tópicos
                </PrimaryTitleGoBack>

                <SearchBar style={styles.searchBar} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

                {!requestDone ? <LoadingIndicator /> :
                    <FlatList
                        ListEmptyComponent={() => <Text>Nenhum Tópico Encontrado!</Text>}
                        contentContainerStyle={styles.flatList}
                        data={topicsList}
                        keyExtractor={(topic) => topic.id}
                        numColumns={2}
                        renderItem={onRender}
                    />
                }

                <Button
                    title={"Test"}
                    onPress={createTopics}
                />
            </View>
        </Wrapper>
    );
}
