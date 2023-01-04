import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Anchor, Button, Card, PrimaryTitleGoBack, RadioSelect, Text, Wrapper } from "../../components";
import ChallengeReportsCollection from "../../services/firebase/db/challengeReports";
import ChallengesCollection from "../../services/firebase/db/challenges";
import { useRequest } from "../../services/firebase/hooks/useRequest";
import styles from "./styles";

export function Challenge({ route, navigation }) {
    const subject = route.params;
    const totalChallenges = subject.challenges.length;

    const [doRequest, responseComponent] = useRequest();

    const [selection, setSelection] = useState(-1);
    const [challenge, setChallenge] = useState(null);
    const [index, setIndex] = useState(subject.current);

    useEffect(() => {
        if (index === null) {
            return;
        }

        ChallengesCollection.get(subject.challenges[index]).then((item) => {
            setChallenge({id: item.id, ...item.data()});
        });
    }, [index]);


    const previousChallenge = () => doRequest(
        {
            handler: () => {
                if (index <= 0) {
                    throw new Error();
                }

                setSelection(-1);
                setIndex(index - 1);
            }
        },
        "Não existe desafio anterior!"
    );

    const nextChallenge = () => {
        if (index >= totalChallenges - 1) {
            console.log("Concluído");
            return;
        }

        setSelection(-1);
        setIndex(index + 1);
    };

    const answerChallenge = async () => {
        ChallengeReportsCollection.post({
            userId: subject.userId,
            challengeId: challenge.id,
            answer: index,
            answeredCorrectly: selection === 0 // TODO
        });

        nextChallenge();
    };

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                        Desafio {challenge?.name}
                    </PrimaryTitleGoBack>

                    <Card style={styles.body}>
                        <Text>{challenge?.body}</Text>
                    </Card>

                    <Card style={styles.answer}>
                        <RadioSelect
                            title={"Escolha a alternativa correta:"}
                            data={challenge?.selection}
                            onSelection={setSelection}
                            value={selection}
                        />
                    </Card>
                    <View style={styles.links}>
                        <Anchor onPress={previousChallenge}>Anterior</Anchor>
                        <Text>{`Desafio ${index + 1}/${totalChallenges}`}</Text>
                        <Anchor onPress={nextChallenge}>Próximo</Anchor>
                    </View>

                    <Button
                        style={styles.button}
                        title={"Responder"}
                        onPress={answerChallenge}
                        disabled={selection === -1}
                        disabledMessage={"Favor, marcar uma alternativa"}
                    />
                </View>
            </ScrollView>

            {responseComponent}
        </Wrapper>
    );
}