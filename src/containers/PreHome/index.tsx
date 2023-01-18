import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { idText } from "typescript";
import { Wrapper, SecondaryTitle, Text, Button } from "../../components";
import { Card } from "../../components/Card";
import { parseCollection } from "../../helpers/collectionUtils";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import TeamsCollection from "../../services/firebase/db/teams";

import styles from "./styles";

export function PreHome({ navigation }) {
    const onGoToGlobalPlatform = () => navigation.navigate("BottomTabNavigator");

    const [user, setUser] = useState(null);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        const getTeams = async () => {
            const global = await TeamsCollection.getMain();
            const teamsInfo = await TeamsCollection.getAll("uLRuLggpXm8TWlHK5997");
            setTeams([...parseCollection(global), {id: teamsInfo.id, ...teamsInfo.data()}]);
        }

        getTeams();
    }, []);

    // useEffect(() => {
    //     TeamsCollection.getAll(user.email).then((teamsInfo) => {
    //         setTeams(parseCollection(teamsInfo));
    //     })
    // }, [user]);

    const onRenderTeam = ({ item }) => {
        return (
            <Card style={styles.card}>
                <View style={styles.cardTop}>
                    <Text style={styles.cardTitle}>{item?.name}</Text>
                    {item?.ownerId !== "main" &&
                        <TouchableOpacity onPress={() => console.log("TODO: deny")}>
                            <MaterialCommunityIcons name="trash-can-outline" size={30} color="white" />
                        </TouchableOpacity>
                    }
                </View>
                <Text>
                    {item?.description}
                </Text>
                <Button style={styles.cardButton} title="Acessar Área" onPress={() => {
                    navigation.navigate("BottomTabNavigator", { team: item?.id })
                }} />
            </Card>
        );
    }

    return (
        <Wrapper>
            <View style={styles.container}>
                <SecondaryTitle>Escolha a forma como deseja acessar a plataforma</SecondaryTitle>

                <FlatList
                    ListEmptyComponent={() => <Text>Quando você entrar em mais times, eles aparecerão aqui!</Text>}
                    contentContainerStyle={styles.flatList}
                    data={teams}
                    numColumns={1}
                    renderItem={onRenderTeam}
                />
            </View>
        </Wrapper>
    );
}
