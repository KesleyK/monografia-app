import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Card, PrimaryTitleGoBack, RadioSelect, Wrapper, Text } from "../../components";
import styles from "./styles";

const mockChoices = [
    "Teste 1",
    "teste 2",
    <Image style={{width: 20, height: 20}} source={require("../../../assets/icon.png")}/>
];

export function Challenge({ route, navigation }) {
    const subject = route.params;
    const [selection, setSelection] = useState(-1);

    return (
        <Wrapper>
            <ScrollView style={styles.container}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                    Desafio {subject.name}
                </PrimaryTitleGoBack>

                <Card style={styles.body}>
                <Text><Image style={{width: 20, height: 20}} source={require("../../../assets/icon.png")}/>Ok</Text>
                </Card>

                <Card style={styles.answer}>
                    <RadioSelect
                        title={"Escolha a alternativa correta"}
                        data={mockChoices}
                        onSelection={setSelection}
                        value={selection}
                    />
                </Card>
            </ScrollView>
        </Wrapper>
    );
}