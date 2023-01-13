import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Anchor, Button, Card, Input, PrimaryTitleGoBack, RadioSelect, Text, Wrapper } from "../../components";
import { CheckBoxSelect } from "../../components/CheckBoxSelect";
import { ChallengeType } from "../../models/enum/ChallengeType";
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

    const [selection, setSelection] = useState(new Set());
    const [answeredPreviously, setAnsweredPreviously] = useState(false);
    const [challenge, setChallenge] = useState(null);
    const [index, setIndex] = useState(subject.current);
    const [disabled, setDisabled] = useState(false);
    const [correct, setCorrect] = useState([]);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        if (index === null) {
            return;
        }

        ChallengesCollection.get(subject.challenges[index]).then((item) => {
            setChallenge({ id: item.id, ...item.data() });
            setPoints([...points, { id: item.id, value: item.data().points }]);

            const report = answers.find(({ challengeId }) => item.id === challengeId);
            if (report) {
                setSelection(new Set(report.answer));
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

                setSelection(new Set());
                setAnsweredPreviously(false);
                setIndex(index - 1);
                setDisabled(false);
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

        setSelection(new Set());
        setAnsweredPreviously(false);
        setIndex(index + 1);
        setDisabled(false);
    };

    const isAnswerCorrect = () => {
        return [...selection].toString() === [...challenge.correct].toString();
    }

    const answerChallenge = async () => {
        console.log([...selection].toString(), [...challenge.correct].toString())
        const answeredCorrectly = isAnswerCorrect();
        const answer = {
            userId: subject.userId,
            challengeId: challenge.id,
            answer: [...selection].map((it) => it.toString()),
            answeredCorrectly
        };

        ChallengeReportsCollection.post(answer);
        answers.push(answer);

        if (answeredCorrectly) {
            UsersCollection.acquirePoints(subject.userId, challenge.points);
        }

        nextChallenge();
    };

    const createAnswerBox = () => {
        switch (challenge?.type) {
            default:
            case ChallengeType.RADIO:
                return <RadioSelect
                    title={"Escolha a alternativa correta:"}
                    data={challenge?.selection}
                    onSelection={(item) => setSelection(new Set([item]))} // TODO: usar novo state
                    value={Number([...selection][0])}
                    correctOption={answeredPreviously ? Number(correct[0]) : -1}
                />;

            case ChallengeType.CHECKBOX:
                return <CheckBoxSelect
                    title={"Escolha a(s) alternativa(s) correta(s):"}
                    data={challenge?.selection}
                    onSelection={setSelection}
                    value={new Set([...selection].map((item) => Number(item)))}
                    correctOptions={new Set(answeredPreviously ? [...correct].map((item) => Number(item)) : [])}
                />;

            case ChallengeType.INPUT:
                console.log(answeredPreviously)
                return (
                    <View>
                        {answeredPreviously && (isAnswerCorrect() ?
                            <Text style={{ ...styles.correct, ...styles.textFeedbackReview }}>Resposta Correta!</Text>
                            :
                            <View>
                                <Text style={styles.incorrect}>
                                    Resposta Incorreta!
                                </Text>
                                <Text style={styles.textFeedbackReview}>
                                    A resposta correta seria {[...challenge.correct].toString()}
                                </Text>
                            </View>
                        )}
                        <Input
                            placeholder={"Digite sua resposta"}
                            onChangeText={(text) => setSelection(new Set([text]))}
                            value={[...selection][0]}
                        />
                    </View>
                );
        }
    }

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
                        {createAnswerBox()}
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
                        softDisabled={disabled || selection.size === 0}
                        disabledMessage={selection.size > 0 ? "Não é possível responder novamente!" : "Favor, marcar uma alternativa"}
                    />
                </View>
            </ScrollView>

            {responseComponent}
        </Wrapper>
    );
}