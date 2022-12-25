import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PrimaryTitleGoBack, UserCardSimple, Wrapper } from "../../components";
import { parseCollection } from "../../helpers/collectionUtils";
import UsersCollection from "../../services/firebase/db/users";
import styles from "./styles";

export function Ranking({route, navigation}) {
    const { platform } = route.params; // TODO
    const [people, setPeople] = useState([]);

    useEffect(() => {
        UsersCollection.getAll().then((usersInfo) => {
            setPeople(parseCollection(usersInfo));
        });
    }, []);

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                        Ranking
                    </PrimaryTitleGoBack>

                    {people.map((person, index) => (
                        <TouchableOpacity key={index} onPress={() => console.log("TODO")}>
                            <UserCardSimple user={person} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Wrapper>
    );
}