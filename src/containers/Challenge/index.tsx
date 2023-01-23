import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Anchor, Button, Card, PrimaryTitleGoBack, RadioSelect, Text, Wrapper } from "../../components";
import ChallengeReportsCollection from "../../services/firebase/db/challengeReports";
import ChallengesCollection from "../../services/firebase/db/challenges";
import UsersCollection from "../../services/firebase/db/users";
import { useRequest } from "../../services/firebase/hooks/useRequest";
import styles from "./styles";

export function Challenge({ route, navigation }) {
    const subject = route.params;
    const totalChallenges = subject.challenges.length;
    const answers = subject.reports;

    const [doRequest, responseComponent] = useRequest();

    const [selection, setSelection] = useState(-1);
    const [answeredPreviously, setAnsweredPreviously] = useState(false);
    const [challenge, setChallenge] = useState(null);
    const [index, setIndex] = useState(subject.current);
    const [disabled, setDisabled] = useState(false);
    const [correct, setCorrect] = useState(null);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        if (index === null) {
            return;
        }

        ChallengesCollection.get(subject.challenges[index]).then((item) => {
            setChallenge({ id: item.id, ...item.data() });
            setPoints([...points, {id: item.id, value: item.data().points}]);

            const report = answers.find(({ challengeId }) => item.id === challengeId);
            if (report) {
                setSelection(report.answer);
                setAnsweredPreviously(true);
                setCorrect(item.data().correct);
                setDisabled(true);
            }
        });
    }, [index]);

    const previousChallenge = () => doRequest(
        {
            handler: () => {
                if (index <= 0) {
                    throw new Error();
                }

                setSelection(-1);
                setAnsweredPreviously(false);
                setIndex(index - 1);
            }
        },
        "Não existe desafio anterior!"
    );

    const nextChallenge = async () => {
        if (index >= totalChallenges - 1) {
            return navigation.navigate("ChallengeFeedback", {
                challenges: subject.challenges,
                userId: subject.userId,
                reports: answers,
                points
            });
        }

        setSelection(-1);
        setAnsweredPreviously(false);
        setIndex(index + 1);
    };

    const answerChallenge = async () => {
        const answeredCorrectly = selection.toString() === challenge.correct;
        const answer = {
            userId: subject.userId,
            challengeId: challenge.id,
            answer: selection.toString(),
            answeredCorrectly
        };

        ChallengeReportsCollection.post(answer);
        answers.push(answer);

        if (answeredCorrectly) {
            UsersCollection.acquirePoints(subject.userId, challenge.points);
        }

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
                            value={Number(selection)}
                            correctOption={answeredPreviously ? Number(correct) : -1}
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
                        softDisabled={disabled || selection === -1}
                        disabledMessage={selection !== -1 ? "Não é possível responder novamente!" : "Favor, marcar uma alternativa"}
                    />
                </View>
            </ScrollView>

            {responseComponent}
        </Wrapper>
    );
}