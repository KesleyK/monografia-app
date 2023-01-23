import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { LoadingIndicator, PrimaryTitle, Text, UserCardSimple, Wrapper } from "../../components";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ChatCollection from "../../services/firebase/db/chat";
import UsersCollection from "../../services/firebase/db/users";
import styles from "./styles";

export function ChatList({ navigation }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [people, setPeople] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [requestDone, setRequestDone] = useState(false);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setCurrentUser(userInfo);
        });
    }, [retrieveUserInfo]);

    useEffect(() => {
        if (currentUser) {
            ChatCollection.find(currentUser.email).then((chats) => {
                setConversations(chats);
            });
        }

    }, [currentUser]);

    useEffect(() => {
        if (conversations.length === 0) {
            return;
        }

        const fetchUserList = async () => {
            const arr = [];

            for (const chat of conversations) {
                const chatWith = chat.receivers.find((receiver) => receiver !== currentUser.email);
                if (!chatWith) {
                    continue;
                }

                const doc = await UsersCollection.get(chatWith);
                const iuser = UsersCollection.convert(doc);
                const converted = {
                    ...iuser,
                    notifications: iuser.email === chat.lastSender ? chat.unread : 0
                };

                arr.push(converted);
            }

            setPeople(arr);
            setRequestDone(true);
        };

        fetchUserList();
    }, [conversations]);

    const onChatWith = (person) => {
        navigation.navigate("Chat", { userId: person });
    };

    const renderList = () => {
        return (
            people.length === 0 ?
                <Text>Nenhuma conversa encontrada!</Text>
                :
                people.map((person, index) => (
                    <TouchableOpacity key={index} onPress={() => onChatWith(person.email)}>
                        <UserCardSimple user={person} chat messages={person.notifications} />
                    </TouchableOpacity>
                ))
        );
    }

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitle style={styles.title}>Mensagens</PrimaryTitle>

                    {requestDone ? renderList() : <LoadingIndicator/>}
                </View>
            </ScrollView>
        </Wrapper>
    );
}
