import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { Button, LoadingIndicator, SecondaryTitle, Text, Wrapper } from "../../components";
import { Card } from "../../components/Card";
import { ConfirmationAlert } from "../../components/ConfirmationAlert";
import { isGlobalPlatform, parseCollection } from "../../helpers/collectionUtils";
import { createPythonCourse } from "../../helpers/test/globalPlatform";
import { ParticipantStatus } from "../../models/enum/ParticipantStatus";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ParticipantsCollection from "../../services/firebase/db/participants";
import TeamsCollection from "../../services/firebase/db/teams";
import { DefaultStyles } from "../../styles/global";

import styles from "./styles";

export function PreHome({ navigation }) {
    const [user, setUser] = useState(null);
    const [teams, setTeams] = useState([]);
    const [participantOf, setParticipantOf] = useState([]);
    const [requestDone, setRequestDone] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [confirmationComponent, setConfirmationComponent] = useState(null);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        getTeams();
    }, [user]);

    const getTeams = async () => {
        const global = await TeamsCollection.getMain();
        const teamsParticipant = parseCollection(await ParticipantsCollection.findByUser(user.email))
            .filter((item) => item.status !== ParticipantStatus.DISABLED);

        const teamsInfo = teamsParticipant.length === 0 ? [] :
            parseCollection(await TeamsCollection.getAll(teamsParticipant.map((item) => item.id)));

        setParticipantOf(teamsParticipant);
        setTeams([...parseCollection(global), ...teamsInfo]);
        setRequestDone(true);
        setRefreshing(false);
    }

    const findParticipantforTeam = (teamId) => {
        return participantOf.find((participation) => participation.teamId === teamId);
    }

    const exitTeam = (teamId) => {
        ParticipantsCollection.updateStatus(findParticipantforTeam(teamId)?.id, ParticipantStatus.DISABLED);
        setTeams([...teams.filter((item) => item.id !== teamId)]);
        setConfirmationComponent(null);
    }

    const onDeleteTeam = (team) => {
        setConfirmationComponent(
            <ConfirmationAlert
                confirmationMessage={`Tem certeza que deseja sair do time ${team.name}?`}
                onCancel={() => setConfirmationComponent(null)}
                onConfirm={() => exitTeam(team?.id)}
            />
        );
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
                        <TouchableOpacity onPress={() => onDeleteTeam(item)}>
                            <MaterialCommunityIcons name="trash-can-outline" size={30} color={DefaultStyles.ICON_COLOR} />
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

    const onRefresh = () => {
        setRefreshing(true);
        getTeams();
    }

    return (
        <Wrapper>
            <View style={styles.container}>
                <SecondaryTitle>Escolha a forma como deseja acessar a plataforma</SecondaryTitle>

                {!requestDone ? <LoadingIndicator /> :
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        ListEmptyComponent={() => <Text>Quando você entrar em mais times, eles aparecerão aqui!</Text>}
                        contentContainerStyle={styles.flatList}
                        data={teams}
                        numColumns={1}
                        renderItem={onRenderTeam}
                    />
                }
            </View>
            {/* <Button title="Test" onPress={createPythonCourse} /> */}

            {confirmationComponent}
        </Wrapper>
    );
}
