import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { LoadingIndicator, PrimaryTitleGoBack, UserCardSimple, Wrapper } from "../../components";
import { createRanking } from "../../helpers/collectionUtils";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ChatCollection from "../../services/firebase/db/chat";
import styles from "./styles";

export function Ranking({route, navigation}) {
    const { team } = route.params;
    const [people, setPeople] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, [retrieveUserInfo]);

    useEffect(() => {
        createRanking(team).then(usersInfo => {
            setPeople(usersInfo);
        })
    }, []);

    const onChatWith = (person) => {
        ChatCollection.create(user.email, person);
        navigation.navigate("Chat", {userId: person});
    };

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                        Ranking
                    </PrimaryTitleGoBack>

                    {people.length === 0 ? <LoadingIndicator/> : people.map((person, index) => (
                        <TouchableOpacity key={index} onPress={() => onChatWith(person.id)}>
                            <UserCardSimple user={person} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Wrapper>
    );
}