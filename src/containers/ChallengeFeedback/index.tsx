import { View } from "react-native";
import { PrimaryTitle, Wrapper } from "../../components";
import styles from "./styles";

export function ChallengeFeedback() {
    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitle>Resultado</PrimaryTitle>
            </View>
        </Wrapper>
    );
}