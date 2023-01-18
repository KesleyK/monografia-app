import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, LoadingIndicator, SecondaryTitle, Text, Wrapper } from "../../components";
import { Card } from "../../components/Card";
import { isGlobalPlatform, parseCollection } from "../../helpers/collectionUtils";
import { ParticipantStatus } from "../../models/enum/ParticipantStatus";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ParticipantsCollection from "../../services/firebase/db/participants";
import TeamsCollection from "../../services/firebase/db/teams";

import styles from "./styles";

export function PreHome({ navigation }) {
    const [user, setUser] = useState(null);
    const [teams, setTeams] = useState([]);
    const [participantOf, setParticipantOf] = useState([]);
    const [requestDone, setRequestDone] = useState(false);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        const getTeams = async () => {
            const global = await TeamsCollection.getMain();
            const teamsParticipant = parseCollection(await ParticipantsCollection.findByUser(user.email))
                .filter((item) => item.status !== ParticipantStatus.DISABLED);

            const teamsInfo = teamsParticipant.length === 0 ? [] :
                parseCollection(await TeamsCollection.getAll(teamsParticipant.map((item) => item.id)));

            setParticipantOf(teamsParticipant);
            setTeams([...parseCollection(global), ...teamsInfo]);
            setRequestDone(true);
        }

        getTeams();
    }, [user]);

    const findParticipantforTeam = (teamId) => {
        return participantOf.find((participation) => participation.teamId === teamId);
    }

    const exitTeam = (teamId) => {
        ParticipantsCollection.updateStatus(findParticipantforTeam(teamId)?.id, ParticipantStatus.DISABLED);
        setTeams([...teams.filter((item) => item.id !== teamId)]);
    }

    const onAccessArea = (team) => {
        if (!isGlobalPlatform(team)) {
            ParticipantsCollection.updateStatus(findParticipantforTeam(team.id)?.id, ParticipantStatus.ACCEPTED);
        }

        navigation.navigate("BottomTabNavigator", { team });
    }

    const onRenderTeam = ({ item }) => {
        return (
            <Card style={styles.card}>
                <View style={styles.cardTop}>
                    <Text style={styles.cardTitle}>{item?.name}</Text>
                    {!isGlobalPlatform(item) &&
                        <TouchableOpacity onPress={() => exitTeam(item?.id)}>
                            <MaterialCommunityIcons name="trash-can-outline" size={30} color="white" />
                        </TouchableOpacity>
                    }
                </View>
                <Text>
                    {item?.description}
                </Text>
                <Button style={styles.cardButton} title="Acessar Área" onPress={() => onAccessArea(item)} />
            </Card>
        );
    }

    return (
        <Wrapper>
            <View style={styles.container}>
                <SecondaryTitle>Escolha a forma como deseja acessar a plataforma</SecondaryTitle>

                {!requestDone ? <LoadingIndicator /> :
                    <FlatList
                        ListEmptyComponent={() => <Text>Quando você entrar em mais times, eles aparecerão aqui!</Text>}
                        contentContainerStyle={styles.flatList}
                        data={teams}
                        numColumns={1}
                        renderItem={onRenderTeam}
                    />
                }
            </View>
        </Wrapper>
    );
}
