import { ScrollView, View } from "react-native";
import { Button, Card, PrimaryTitle, Text, Wrapper } from "../../components";
import styles from "./styles";

export function ChallengeFeedback({ route, navigation }) {
    const { challenges, userId, reports, points } = route.params;

    const correct = reports.filter(it => it.answeredCorrectly);

    const pointsEarned = correct.map(it => {
        return points.find(point => point.id === it.challengeId)?.value;
    });

    const totalPoints = pointsEarned.reduce((sum, p) => sum + p, 0);

    const notAnswered = challenges.length - reports.length;
    const errors = challenges.length - notAnswered - correct.length

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <PrimaryTitle style={styles.title}>Resultados</PrimaryTitle>

                    <Card style={styles.generalFeedback}>
                        <View style={styles.generalFeedbackContainer}>
                            <View>
                                <Text style={styles.textBold}>Taxa de acerto:</Text>
                                <Text style={{...styles.rate, ...styles.correct}}>{correct.length}/{challenges.length} ({correct.length / challenges.length * 100}%)</Text>
                                <Text style={styles.textBold}>Taxa de erro:</Text>
                                <Text style={{...styles.rate, ...styles.incorrect}}>{errors}/{challenges.length} ({errors / challenges.length * 100}%)</Text>
                                <Text style={styles.textBold}>Não respondidas:</Text>
                                <Text style={styles.rate}>{notAnswered}/{challenges.length} ({notAnswered / challenges.length * 100}%)</Text>
                            </View>
                            <View style={styles.resultsContainer}>
                                <Text style={styles.numberResults}>+{totalPoints}</Text>
                                <Text style={styles.results}>Pontos</Text>
                            </View>
                        </View>
                    </Card>

                    <PrimaryTitle style={styles.subtitle} small>Detalhamento</PrimaryTitle>

                    {challenges.map((item, index) => {
                        const answer = reports.find(it => it.challengeId === item);
                        const challengePoints = points.find(it => it.id === item)?.value;
                        const pointsAcquired = answer?.answeredCorrectly ? challengePoints : 0;

                        return (
                            <Card key={index} style={styles.individualFeedback}>
                                <View>
                                    <Text>Desafio {index + 1}</Text>
                                    {!answer ?
                                        <Text>Não respondeu</Text>
                                        :
                                        answer?.answeredCorrectly ?
                                            <Text style={styles.correct}>Resposta Correta</Text>
                                            :
                                            <Text style={styles.incorrect}>Resposta Incorreta</Text>
                                    }
                                </View>
                                <View style={{ alignSelf: "center" }}>
                                    {!answer ?
                                        <Text>-</Text>
                                        :
                                        <Text style={answer?.answeredCorrectly ? styles.correct : styles.incorrect}>
                                            +{pointsAcquired} pontos
                                        </Text>
                                    }
                                </View>
                            </Card>
                        );
                    })}

                    <Button
                        style={styles.reviewButton}
                        title={"Revisar"}
                        onPress={() => navigation.goBack()}
                        fullWidth
                    />

                    <Button
                        style={styles.reviewButton}
                        title={"Concluir"}
                        onPress={() => navigation.pop(2)}
                        fullWidth
                    />
                </View>
            </ScrollView>
        </Wrapper>
    );
}