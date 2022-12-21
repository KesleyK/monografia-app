import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Wrapper, PrimaryTitle, SearchBar, Text, Anchor, UserCardSimple } from "../../components";
import { normalizeString, verifyStringInclusion } from "../../helpers/stringManagement";

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
    }
];

const mockPersonsRank = [
    {
        name: "user 1",
        points: "180"
    },
    {
        name: "user 2",
        points: "2"
    },
    {
        name: "user 3",
        points: "1802"
    },
    {
        name: "user 4",
        points: "15"
    }
];

export function Home() {
    const [searchPhrase, setSearchPhrase] = useState("");

    const topicsList = mockTopics
        .filter((topic) => verifyStringInclusion(normalizeString(topic.name), normalizeString(searchPhrase)))
        .map((topic, index) => (
            <View style={styles.topicsCard} key={index}>
                <Foundation name={topic.icon} size={40} color="white" />
                <Text style={styles.topicName}>{topic.name}</Text>
            </View>
        ));

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitle style={styles.title}>Bem-vindo!</PrimaryTitle>

                    <SearchBar style={styles.searchBar} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

                    <View style={styles.topicsBox}>
                        <View style={styles.secondaryTitleContainer}>
                            <PrimaryTitle small>Tópicos</PrimaryTitle>

                            <AntDesign name="arrowsalt" size={12} color="white" />
                        </View>

                        <View style={styles.topicsList}>
                            {topicsList.length ? topicsList : <Text>Nenhum tópico encontrado</Text>}
                        </View>
                    </View>

                    <View>
                        <View style={styles.secondaryTitleContainer}>
                            <PrimaryTitle small>Ranking</PrimaryTitle>

                            <AntDesign name="arrowsalt" size={12} color="white" />
                        </View>

                        {mockPersonsRank.map((person, index) => (
                            <UserCardSimple user={person} key={index} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    );
}
