import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Wrapper, PrimaryTitle, SearchBar, Text } from "../../components";

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
    },
]

export function Home() {
    const [searchPhrase, setSearchPhrase] = useState("");

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitle style={styles.title}>Bem-vindo!</PrimaryTitle>

                    <SearchBar
                        style={styles.searchBar}
                        searchPhrase={searchPhrase}
                        setSearchPhrase={setSearchPhrase}
                    />

                    <View style={styles.topicsBox}>
                        <PrimaryTitle style={styles.smallTitle} small>
                            Tópicos
                        </PrimaryTitle>

                        <View style={styles.topicsList}>
                            {mockTopics.map((topic, index) => (
                                <View style={styles.topicsCard} key={index}>
                                    <Foundation name={topic.icon} size={40} color="white" />
                                    <Text style={styles.topicName}>{topic.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View>
                        <PrimaryTitle style={styles.smallTitle} small>
                            Ranking
                        </PrimaryTitle>

                        {mockPersonsRank.map((person, index) => (
                            <View style={styles.rankingCard} key={index}>
                                <View style={styles.rankingCardLeftBox}>
                                    <Ionicons style={styles.rankingCardIcon} name="ios-person-circle-sharp" size={40} color="white" />
                                    <Text>{person.name}</Text>
                                </View>

                                <View>
                                    <Text>{person.points}</Text>
                                </View>
                            </View>
                        ))}                        
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    );
}
