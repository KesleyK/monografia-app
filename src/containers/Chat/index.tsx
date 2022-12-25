import { View } from "react-native";
import { Card, PrimaryTitleGoBack, UserCardComplete, Wrapper } from "../../components";
import styles from "./styles"

export function Chat({route, navigation}) {
    const { userId } = route.params;

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={{ marginBottom: "10%" }} onPress={() => navigation.goBack()}>
                    Configurações
                </PrimaryTitleGoBack>

                <Card>

                    
                </Card>
            </View>
        </Wrapper>
    );
}