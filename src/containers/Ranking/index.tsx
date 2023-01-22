import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
import { LoadingIndicator, PrimaryTitleGoBack, UserCardSimple, Wrapper } from "../../components";
import { chatBetween } from "../../helpers/chatUtils";
import { createRanking } from "../../helpers/collectionUtils";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ChatCollection from "../../services/firebase/db/chat";
import styles from "./styles";

export function Ranking({ route, navigation }) {
    const { team } = route.params;
    const [people, setPeople] = useState([]);
    const [user, setUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        loadRanking();
    }, []);

    const loadRanking = () => {
        createRanking(team).then(usersInfo => {
            setPeople(usersInfo);
            setRefreshing(false);
        })
    }

    const onRefresh = () => {
        setRefreshing(true);
        loadRanking();
    }

    return (
        <Wrapper>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.container}>
                    <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                        Ranking
                    </PrimaryTitleGoBack>

                    {people.length === 0 ? <LoadingIndicator /> : people.map((person, index) => (
                        <UserCardSimple
                            key={index}
                            user={person}
                            onPress={() => chatBetween(user.email, person.id, navigation, true)}
                        />
                    ))}
                </View>
            </ScrollView>
        </Wrapper>
    );
}