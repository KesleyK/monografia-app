import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { PrimaryTitle, UserCardSimple, Wrapper } from "../../components";
import { parseCollection } from "../../helpers/collectionUtils";
import UsersCollection from "../../services/firebase/db/users";
import styles from "./styles";

export function ChatList({ navigation }) {
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
                    <PrimaryTitle style={styles.title}>Mensagens</PrimaryTitle>

                    {people.map((person, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate("Chat", { userId: person.id })}
                        >
                            <UserCardSimple user={person} chat />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Wrapper>
    );
}
