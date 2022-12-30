import TopicsCollection from "../services/firebase/db/topics";

export default async () => {
    await TopicsCollection.createTestData({
        name: "Ciência de Dados",
        icon: "align-vertical-bottom",
        subtopics: [
            {
                name: "Básico",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Intermediário",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Avançado",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
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
                challenges: []
            },
            {
                name: "Intermediário",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Avançado",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
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
                challenges: []
            },
            {
                name: "Intermediário",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Avançado",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
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
                challenges: []
            },
            {
                name: "Operadores",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Condicionais",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Loops",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Funções",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
            {
                name: "Final",
                description: "Aqui você encontra uma série de perguntas relacionadas ao tópico",
                challenges: []
            },
        ]
    });
    
    console.log("massa de teste criada");
}