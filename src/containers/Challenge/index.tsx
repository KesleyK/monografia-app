import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Markdown from 'react-native-markdown-package';
import { Anchor, Button, Card, Input, PrimaryTitleGoBack, RadioSelect, Text, Wrapper } from "../../components";
import { CheckBoxSelect } from "../../components/CheckBoxSelect";
import { earnPoints } from "../../helpers/collectionUtils";
import { markdownStyle } from "../../helpers/markdownStyles";
import { ChallengeType } from "../../models/enum/ChallengeType";
import ChallengeReportsCollection from "../../services/firebase/db/challengeReports";
import ChallengesCollection from "../../services/firebase/db/challenges";
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

    const onGoToFeedback = () => {
        navigation.navigate("ChallengeFeedback", {
            challenges: subject.challenges,
            userId: subject.userId,
            reports: answers,
            points
        });
    }

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
            return onGoToFeedback();
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
            earnPoints(subject.userId, challenge.points, subject.participant?.id);
        }

        nextChallenge();
    };

    const createFeedbackText = () => {
        return answeredPreviously && (isAnswerCorrect() ?
            <Text style={{ ...styles.correct, ...styles.textFeedbackReview }}>Resposta Correta!</Text>
            :
            <Text style={{ ...styles.incorrect, ...styles.textFeedbackReview }}>Resposta Incorreta!</Text>
        );
    }

    const createAnswerBox = () => {
        switch (challenge?.type) {
            default:
            case ChallengeType.RADIO:
                return <RadioSelect
                    title={"Escolha a alternativa correta:"}
                    data={challenge?.selection}
                    onSelection={(item) => setSelection(new Set([item]))}
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
                return (
                    <View>
                        {answeredPreviously && !isAnswerCorrect() &&
                            <Text style={styles.textFeedbackReview}>
                                A resposta correta é: <Text style={styles.correct}>{[...challenge.correct].toString()}</Text>
                            </Text>
                        }

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
                        <Markdown styles={markdownStyle}>
                            {challenge?.body}
                        </Markdown>
                    </Card>

                    <Card style={styles.answer}>
                        {createFeedbackText()}
                        {createAnswerBox()}
                    </Card>
                    <View style={styles.links}>
                        <Anchor onPress={previousChallenge}>Anterior</Anchor>
                        <Text>{`Desafio ${index + 1}/${totalChallenges}`}</Text>
                        <Anchor onPress={nextChallenge}>Próximo</Anchor>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Button
                            fullWidth
                            title={"Responder"}
                            onPress={answerChallenge}
                            softDisabled={disabled || selection.size === 0}
                            disabledMessage={selection.size > 0 ? 
                                "Não é possível responder novamente!" : 
                                "Favor, marcar uma alternativa"}
                        />

                        {answeredPreviously &&
                            <Button
                                fullWidth
                                title={"Ir Para Feedback"}
                                onPress={onGoToFeedback}
                            />
                        }
                    </View>
                </View>
            </ScrollView>

            {responseComponent}
        </Wrapper>
    );
}