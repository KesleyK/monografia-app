import TopicsCollection from "../../services/firebase/db/topics";

export default async () => {
    await TopicsCollection.createTestData({
        name: "Ciência de Dados",
        icon: "align-vertical-bottom",
        subtopics: []
    });
    await TopicsCollection.createTestData({
        name: "Computação em Nuvem",
        icon: "cloud",
        subtopics: []
    });
    await TopicsCollection.createTestData({
        name: "Aprendizado de Máquina",
        icon: "graph-outline",
        subtopics: []
    });

    console.log("massa de teste criada");
}