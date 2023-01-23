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
                description: "Resolva desafios acerta da entrada e saída de dados padrão da linguagem Python",
                challenges: challenges.filter(({category}) => category === "io").map(({id}) => id)
            },
            {
                name: "Operadores",
                description: "Aqui você encontra uma série de perguntas relacionadas aos operadores existentes na linguagem Python",
                challenges: challenges.filter(({category}) => category === "ops").map(({id}) => id)
            },
            {
                name: "Condicionais",
                description: "Aqui você encontra uma série de perguntas relacionadas às condicionais",
                challenges: challenges.filter(({category}) => category === "ifelse").map(({id}) => id)
            },
            {
                name: "Loops",
                description: "Aqui você encontra uma série de perguntas relacionadas às estruturas de loops do Python",
                challenges: challenges.filter(({category}) => category === "loop").map(({id}) => id)
            },
            {
                name: "Funções",
                description: "Aqui você encontra uma série de perguntas relacionadas à criação e uso de funções por meio da linguagem Python",
                challenges: challenges.filter(({category}) => category === "func").map(({id}) => id)
            },
        ]
    });

    console.log("massa de teste criada");
}