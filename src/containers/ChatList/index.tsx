import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity, View } from "react-native";
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
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setCurrentUser(userInfo);
        });
    }, [retrieveUserInfo]);

    useEffect(() => {
        fetchConversations();
    }, [currentUser]);

    useEffect(() => {
        if (conversations.length === 0) {
            return;
        }

        fetchUserList();
    }, [conversations]);

    const fetchConversations = () => {
        if (currentUser) {
            ChatCollection.find(currentUser.email).then((chats) => {
                setConversations(chats);
            });
        }
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
        setRefreshing(false);
    };

    const onChatWith = (person) => {
        navigation.navigate("Chat", { userId: person });
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchConversations();
    }

    const renderList = people.length === 0 ? <Text>Nenhuma conversa encontrada!</Text> :
        people.map((person, index) => (
            <TouchableOpacity key={index} onPress={() => onChatWith(person.email)}>
                <UserCardSimple user={person} chat messages={person.notifications} />
            </TouchableOpacity>
        ))


    return (
        <Wrapper>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.container}>
                    <PrimaryTitle style={styles.title}>Mensagens</PrimaryTitle>

                    {requestDone ? renderList : <LoadingIndicator />}
                </View>
            </ScrollView>
        </Wrapper>
    );
}
