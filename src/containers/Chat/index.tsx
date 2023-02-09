import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Input, Message, PrimaryTitleGoBack, Wrapper, Text, LoadingIndicator } from "../../components";
import { extractFirstName } from "../../helpers/stringManagement";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ChatCollection from "../../services/firebase/db/chat";
import UsersCollection from "../../services/firebase/db/users";
import { DefaultStyles } from "../../styles/global";
import styles from "./styles";

export function Chat({ route, navigation }) {
    const { userId } = route.params;
    const flatListRef = useRef<FlatList>(null);

    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [destination, setDestination] = useState(null);
    const [chat, setChat] = useState(null);
    const [msgs, setMsgs] = useState([]);
    const [requestDone, setRequestDone] = useState(false);

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setCurrentUser(userInfo);
        });
    }, [retrieveUserInfo]);

    useEffect(() => {
        UsersCollection.get(userId).then((userInfo) => {
            setDestination(UsersCollection.convert(userInfo));
        })
    }, []);

    useEffect(() => {
        if (currentUser) {
            ChatCollection.find(currentUser.email, userId).then(setChat);
        }
    }, [currentUser, userId]);

    useEffect(() => {
        let unsubscribe;
        if (chat) {
            unsubscribe = ChatCollection.listener(chat.id, (document) => {
                ChatCollection.readMessages(chat.id, currentUser.email);
                setMsgs(document.data().msgs);
                setRequestDone(true);
            });
        }

        return () => unsubscribe?.();
    }, [chat?.id]);

    const onSendMessage = () => {
        if (message === "") {
            return;
        }

        ChatCollection.sendMessage(chat.id, message, currentUser.email);
        setMessage("");
    };

    const onRender = ({ item }) => (
        <Message
            style={{ marginBottom: 10 }}
            sent={item.from === currentUser?.email}
        >
            {item.msg}
        </Message>
    );

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={{ marginBottom: "10%" }} onPress={() => navigation.goBack()}>
                    Conversa com {extractFirstName(destination?.name)}
                </PrimaryTitleGoBack>

                <Card style={styles.messagesContainer}>
                    {
                        requestDone ?
                            <FlatList
                                ref={flatListRef}
                                onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
                                ListEmptyComponent={() => (
                                    <Text style={styles.noMessagesFound}>
                                        Inicie a conversa com {destination?.name} enviando
                                        uma mensagem na caixa de texto abaixo
                                    </Text>
                                )}
                                data={msgs}
                                renderItem={onRender}
                            />
                            :
                            <LoadingIndicator />
                    }

                </Card>

                <View style={styles.messageInputBox}>
                    <Input
                        placeholder={"Digite uma mensagem..."}
                        style={styles.messageInput}
                        multiline
                        onChangeText={setMessage}
                        value={message}
                    />
                    <TouchableOpacity style={styles.send} onPress={onSendMessage} >
                        <Ionicons name={"send"} size={25} color={DefaultStyles.ICON_COLOR} />
                    </TouchableOpacity>
                </View>
            </View>
        </Wrapper>
    );
}