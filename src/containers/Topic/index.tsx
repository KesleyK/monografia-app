import { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, LoadingIndicator, PrimaryTitleGoBack, Text, Wrapper } from "../../components";
import { ProgressBar } from "../../components/ProgressBar";
import { ITopic } from "../../models/ITopic";
import styles from "./styles";

export function Topic({ route, navigation }) {
    const topic = route.params as ITopic;
    const [requestDone, setRequestDone] = useState(false);

    useEffect(() => {
        setRequestDone(true);
    }, []);

    const onRenderSubtopic = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <Card>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <ProgressBar style={styles.progressBar} total={10} progress={5} subject={"desafios concluídos"} />
                    <Button
                        style={styles.cardButton}
                        title="Acessar Desafios"
                        onPress={() => navigation.navigate("Challenge", item)} />
                </Card>
            </View>
        );
    }
    return (
        <Wrapper>
            <View style={styles.container}>
                <PrimaryTitleGoBack style={styles.title} onPress={() => navigation.goBack()}>{topic.name}</PrimaryTitleGoBack>

                {!requestDone ? <LoadingIndicator /> :
                    <FlatList
                        ListEmptyComponent={() => <Text>Nenhum Conteúdo Encontrado!</Text>}
                        contentContainerStyle={styles.flatList}
                        data={topic.subtopics}
                        numColumns={1}
                        renderItem={onRenderSubtopic}
                    />
                }
            </View>
        </Wrapper>
    );
}