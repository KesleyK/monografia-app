import { Ionicons } from "@expo/vector-icons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Input, Message, PrimaryTitleGoBack, Wrapper } from "../../components";
import { extractFirstName } from "../../helpers/stringManagement";
import UsersCollection from "../../services/firebase/db/users";
import styles from "./styles";

const mockMessages = [
    {
        sent: true,
        message: "Oi, não estou conseguindo resolver o desafio 1 de python",
    },
    {
        sent: true,
        message: "Poderia me ajudar?",
    },
    {
        sent: false,
        message: "Opa, posso ajudar sim, qual a dúvida?"
    }
]

export function Chat({ route, navigation }) {
    const { userId } = route.params;
    const scrollViewRef = useRef() as MutableRefObject<ScrollView>;

    const [msg, setMsg] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        UsersCollection.get(userId).then((userInfo) => {
            setUser(UsersCollection.convert(userInfo));
        });
    }, []);

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={{ marginBottom: "10%" }} onPress={() => navigation.goBack()}>
                    Conversa com {extractFirstName(user?.name)}
                </PrimaryTitleGoBack>

                <Card style={styles.messagesContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >
                        {mockMessages.map((message, index) => {
                            return (
                                <Message
                                    key={index}
                                    style={{ marginBottom: 10 }}
                                    sent={message.sent}
                                >
                                    {message.message}
                                </Message>
                            );
                        })}
                    </ScrollView>
                </Card>

                <View style={styles.messageInputBox}>
                    <Input
                        placeholder={"Digite uma mensagem..."}
                        style={styles.messageInput}
                        multiline
                        onChangeText={setMsg}
                        value={msg}
                    />
                    <TouchableOpacity style={styles.send} onPress={() => {
                        if (msg === "") {
                            return;
                        }

                        mockMessages.push({ sent: true, message: msg });
                        setMsg("");
                    }} >
                        <Ionicons name={"send"} size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </Wrapper>
    );
}