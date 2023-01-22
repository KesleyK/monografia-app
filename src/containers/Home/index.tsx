import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { PrimaryTitle, SearchBar, Text, UserCardSimple, Wrapper } from "../../components";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createRanking, isGlobalPlatform, parseCollection } from "../../helpers/collectionUtils";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ParticipantsCollection from "../../services/firebase/db/participants";
import TopicsCollection from "../../services/firebase/db/topics";
import styles from "./styles";
import ChatCollection from "../../services/firebase/db/chat";

export function Home({ route, navigation }) {
    const TOPICS_LIMIT = 3;
    const RANKING_LIMIT = 10;

    const { team } = route.params;

    const [currentUser, setCurrentUser] = useState(null);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [topics, setTopics] = useState([]);
    const [people, setPeople] = useState([]);
    const [participant, setParticipant] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setCurrentUser(userInfo);
        });
    }, []);

    useEffect(() => {
        loadTopics();
        loadRanking();
    }, []);

    const loadTopics = () => {
        if (team.topics.length === 0) {
            return;
        }

        TopicsCollection.getAll(team.topics).then((topicsInfo) => {
            setTopics(parseCollection(topicsInfo));
        });
    }

    const loadRanking = () => {
        createRanking(team, RANKING_LIMIT).then(usersInfo => {
            setPeople(usersInfo);
        });

        if (!isGlobalPlatform(team)) {
            retrieveUserInfo().then(userInfo => {
                ParticipantsCollection.findByUser(userInfo.email).then(participants => {
                    const teamMember = parseCollection(participants).find(part => part.teamId === team.id);
                    setParticipant(teamMember);
                });
            });
        }

        setRefreshing(false);
    }

    const onChatWith = (person) => {
        ChatCollection.create(currentUser.email, person);
        navigation.navigate("Chat", { userId: person });
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadTopics();
        loadRanking();
    }

    const topicsList = topics
        .filter((topic) => verifyStringInclusion(normalizeString(topic.name), normalizeString(searchPhrase)))
        .map((topic, index) => (
            <TouchableOpacity style={styles.topicClickable} onPress={() => navigation.navigate("Topic", { topic, participant })} key={index}>
                <View style={styles.topicsCard}>
                    <MaterialCommunityIcons name={topic.icon} size={40} color="white" />
                    <Text style={styles.topicName}>{topic.name}</Text>
                </View>
            </TouchableOpacity>
        ))
        .slice(0, TOPICS_LIMIT);

    return (
        <Wrapper>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.container}>
                    <PrimaryTitle style={styles.title}>Bem-vindo!</PrimaryTitle>

                    <SearchBar style={styles.searchBar} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

                    <View style={styles.topicsBox}>
                        <TouchableOpacity
                            style={styles.secondaryTitleContainer}
                            onPress={() => navigation.navigate("TopicList", { topics, participant })}
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
                            onPress={() => navigation.navigate("Ranking", { team })}
                        >
                            <PrimaryTitle small>Ranking</PrimaryTitle>

                            <AntDesign name="arrowsalt" size={12} color="white" />
                        </TouchableOpacity>

                        {people.map((person, index) => (
                            <UserCardSimple
                                key={index}
                                user={person}
                                onPress={() => onChatWith(person.email)}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    );
}
