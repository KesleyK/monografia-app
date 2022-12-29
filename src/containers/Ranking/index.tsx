import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { PrimaryTitleGoBack, UserCardSimple, Wrapper } from "../../components";
import { parseCollection } from "../../helpers/collectionUtils";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ChatCollection from "../../services/firebase/db/chat";
import UsersCollection from "../../services/firebase/db/users";
import styles from "./styles";

export function Ranking({route, navigation}) {
    const { platform } = route.params; // TODO
    const [people, setPeople] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, [retrieveUserInfo]);

    useEffect(() => {
        UsersCollection.getAll().then((usersInfo) => {
            setPeople(parseCollection(usersInfo));
        });
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

                    {people.map((person, index) => (
                        <TouchableOpacity key={index} onPress={() => onChatWith(person.id)}>
                            <UserCardSimple user={person} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Wrapper>
    );
}