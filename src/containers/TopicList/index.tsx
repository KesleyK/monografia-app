import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, PrimaryTitleGoBack, SearchBar, Text, Wrapper } from "../../components";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";
import styles from "./styles";

export function TopicList({ route, navigation }) {
    const { topics } = route.params;
    const [searchPhrase, setSearchPhrase] = useState("");

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

                <FlatList
                    ListEmptyComponent={() => <Text>Nenhum Tópico Encontrado!</Text>}
                    contentContainerStyle={styles.flatList}
                    data={topicsList}
                    keyExtractor={(topic) => topic.id}
                    numColumns={2}
                    renderItem={onRender}
                />
            </View>
        </Wrapper>
    );
}
