import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, LoadingIndicator, PrimaryTitleGoBack, Text, Wrapper } from "../../components";
import { ProgressBar } from "../../components/ProgressBar";
import { parseCollection } from "../../helpers/collectionUtils";
import { retrieveUserInfo } from "../../services/firebase/auth/retrieveUserInfo";
import ChallengeReportsCollection from "../../services/firebase/db/challengeReports";
import SubtopicsCollection from "../../services/firebase/db/subtopics";
import styles from "./styles";

export function Topic({ route, navigation }) {
    const { topic, participant } = route.params;
    const [requestDone, setRequestDone] = useState(false);
    const [user, setUser] = useState(null);
    const [progresses, setProgresses] = useState([]);
    const [subtopics, setSubtopics] = useState([])
    const isFocused = useIsFocused();

    let shouldDisable = false;

    useEffect(() => {
        retrieveUserInfo().then((userInfo) => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        ChallengeReportsCollection.findByTopic(user.email, topic).then((reports) => {
            setProgresses(reports);
            setRequestDone(true);
        });
    }, [isFocused, user]);

    useEffect(() => {
        SubtopicsCollection.getAll(topic.subtopics).then((subtopicsInfo) => {
            setSubtopics(parseCollection(subtopicsInfo));
        });
    }, [])

    const getProgress = ({ challenges }) => {
        const total = challenges?.length || 0;
        let progress = 0;

        for (const challenge of challenges) {
            if (progresses.map(({ challengeId }) => challengeId).includes(challenge)) {
                progress++;
            }
        }

        return [progress, total];
    };

    const filterReportsForSubtopic = (subtopic, report) => (
        subtopic.challenges.includes(report.challengeId)
    );

    const onRenderSubtopic = ({ item }) => {
        const [progress, total] = getProgress(item);

        const disabled = topic.isSequential && shouldDisable;
        shouldDisable = progress < total;

        return (
            <View style={styles.cardContainer}>
                <Card>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    {!disabled && <Text>{item.description}</Text>}
                    <ProgressBar
                        style={styles.progressBar}
                        total={total}
                        progress={progress}
                        subject={"desafios concluídos"}
                    />

                    <Button
                        style={styles.cardButton}
                        title={disabled ? "Bloqueado" : "Acessar Desafios"}
                        onPress={() => navigation.navigate("Challenge", {
                            challenges: item.challenges,
                            current: 0,
                            userId: user.email,
                            reports: progresses.filter((report) => filterReportsForSubtopic(item, report)),
                            participant
                        })}
                        disabled={item.challenges.length === 0 || disabled}
                    />
                </Card>
            </View>
        );
    };

    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>
                    {topic.name}
                </PrimaryTitleGoBack>

                {!requestDone ? <LoadingIndicator /> :
                    <FlatList
                        ListEmptyComponent={() => <Text>Nenhum Conteúdo Encontrado!</Text>}
                        contentContainerStyle={styles.flatList}
                        data={subtopics} //TODO
                        numColumns={1}
                        renderItem={onRenderSubtopic}
                    />
                }
            </View>
        </Wrapper>
    );
}