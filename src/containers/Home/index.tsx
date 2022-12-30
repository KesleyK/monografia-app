import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import { PrimaryTitle, SearchBar, Text, UserCardSimple, Wrapper } from "../../components";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";

import { parseCollection } from "../../helpers/collectionUtils";
import TopicsCollection from "../../services/firebase/db/topics";
import UsersCollection from "../../services/firebase/db/users";
import styles from "./styles";

export function Home({ navigation }) {
    const TOPICS_LIMIT = 3;
    const RANKING_LIMIT = 10;

    const [searchPhrase, setSearchPhrase] = useState("");
    const [topics, setTopics] = useState([]);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        TopicsCollection.getAll().then((topicsInfo) => {
            setTopics(parseCollection(topicsInfo));
        });
    }, []);

    useEffect(() => {
        UsersCollection.getAll().then((usersInfo) => {
            setPeople(parseCollection(usersInfo));
        });
    }, []);

    const topicsList = topics
        .filter((topic) => verifyStringInclusion(normalizeString(topic.name), normalizeString(searchPhrase)))
        .map((topic, index) => (
            <View style={styles.topicsCard} key={index}>
                <Foundation name={topic.icon} size={40} color="white" />
                <Text style={styles.topicName}>{topic.name}</Text>
            </View>
        ))
        .slice(0, TOPICS_LIMIT);

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitle style={styles.title}>Bem-vindo!</PrimaryTitle>

                    <SearchBar style={styles.searchBar} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

                    <View style={styles.topicsBox}>
                        <TouchableOpacity
                            style={styles.secondaryTitleContainer}
                            onPress={() => navigation.navigate("TopicStack")}
                        >
                            <PrimaryTitle small>Tópicos</PrimaryTitle>

                            <AntDesign name="arrowsalt" size={12} color="white" />
                        </TouchableOpacity>

                        <View style={styles.topicsList}>
                            {topicsList.length ? topicsList : <Text>Nenhum tópico encontrado</Text>}
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styles.secondaryTitleContainer}
                            onPress={() => navigation.navigate("Ranking", {
                                platform: "global" // TODO
                            })}
                        >
                            <PrimaryTitle small>Ranking</PrimaryTitle>

                            <AntDesign name="arrowsalt" size={12} color="white" />
                        </TouchableOpacity>

                        {people.slice(0, RANKING_LIMIT).map((person, index) => (
                            <UserCardSimple user={person} key={index} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    );
}
