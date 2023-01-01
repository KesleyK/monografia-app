import { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, PrimaryTitleGoBack, RadioSelect, Wrapper } from "../../components";
import styles from "./styles";

const mockChoices = [
    "Teste 1",
    "teste 2",
    "ultimo"
];

export function Challenge({ route, navigation }) {
    const subject = route.params;
    const [selection, setSelection] = useState(-1);

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                    Desafio {subject.name}
                </PrimaryTitleGoBack>

                <Card style={styles.body}>

                </Card>

                <Card style={styles.answer}>
                    <RadioSelect
                        title={"Escolha a alternativa correta"}
                        data={mockChoices}
                        onSelection={(option) => setSelection(option)}
                    />
                </Card>
            </View>
        </Wrapper>
    );
}