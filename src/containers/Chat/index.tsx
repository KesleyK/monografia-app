import { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Input, PrimaryTitleGoBack, UserCardComplete, Wrapper } from "../../components";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import UsersCollection from "../../services/firebase/db/users";
import styles from "./styles"

export function Chat({route, navigation}) {
    const { userId } = route.params;

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
                    Conversa com {user?.name}
                </PrimaryTitleGoBack>

                <Card style={styles.messagesContainer}>
                    
                </Card>
                <View style={styles.messageInputBox}>
                    <Input style={styles.messageInput} multiline/>
                </View>
            </View>
        </Wrapper>
    );
}