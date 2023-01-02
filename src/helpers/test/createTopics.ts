import ChallengesCollection from "../../services/firebase/db/challenges";
import TopicsCollection from "../../services/firebase/db/topics";
import { parseCollection } from "../collectionUtils";

export default async () => {
    const challenges = parseCollection(await ChallengesCollection.getAll());
    const challengeIds = challenges.map(({id}) => id);

    await TopicsCollection.createTestData({
        name: "Ciência de Dados",
        icon: "align-vertical-bottom",
        subtopics: [
            {
                name: "Básico",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Intermediário",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Avançado",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            }
        ]
    });
    await TopicsCollection.createTestData({
        name: "Computação em Nuvem",
        icon: "cloud",
        subtopics: [
            {
                name: "Básico",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Intermediário",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Avançado",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            }
        ]
    });
    await TopicsCollection.createTestData({
        name: "Aprendizado de Máquina",
        icon: "graph-outline",
        subtopics: [
            {
                name: "Básico",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Intermediário",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Avançado",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            }
        ]
    });
    await TopicsCollection.createTestData({
        name: "Python",
        icon: "language-python",
        subtopics: [
            {
                name: "Input e Output",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Operadores",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Condicionais",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Loops",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Funções",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
            {
                name: "Final",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: challengeIds
            },
        ]
    });

    console.log("massa de teste criada");
}