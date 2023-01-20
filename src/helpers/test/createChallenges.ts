import { ChallengeType } from "../../models/enum/ChallengeType";
import ChallengesCollection from "../../services/firebase/db/challenges";

export default async () => {
    await ChallengesCollection.createTestData({
        name: "Hello World",
        body: `Insira no código a seguir, o trecho que falta para que seja produzido o output Hello World:
        
\`\`\`        
___("Hello World")
\`\`\`
`,
        type: ChallengeType.INPUT,
        selection: [],
        correct: ["print"],
        points: 10,
        category: "io",
        feedback: "Isso é um feedback!"
    });

    await ChallengesCollection.createTestData({
        name: "input",
        body: `O que faz o seguinte código?

\`\`\`
valor = input()
\`\`\`
`,
        type: ChallengeType.RADIO,
        selection: [
            "Atribui um valor pré-determinado à variável",
            "Envia um valor para o usuário",
            "Atribui o valor digitado pelo usuário na variável",
            "Nenhuma das alternativas acima"
        ],
        correct: ["2"],
        points: 5,
        category: "io",
        feedback: "Isso é um feedback!"
    });

    await ChallengesCollection.createTestData({
        name: "input",
        body: `Qual será o output do código a seguir?
        
\`\`\`        
input("Digite a sua idade:")
print("Sua idade é", idade)
\`\`\`
`,
        type: ChallengeType.RADIO,
        selection: [
            "10",
            "Valor digitado pelo usuário",
            "\"Sua idade é\", seguido pelo valor digitado pelo usuário",
            "Erro"
        ],
        correct: ["3"],
        points: 10,
        category: "io",
        feedback: "Isso é um feedback!"
    });
    
    await ChallengesCollection.createTestData({
        name: "Divisão",
        body: "Qual operador é usado para a operação de divisão em python?",
        type: ChallengeType.RADIO,
        selection: [
            "div()",
            "divide()",
            "÷",
            "/",
            "*"
        ],
        correct: ["3"],
        points: 10,
        category: "ops",
        feedback: "Isso é um feedback!"
    });

    await ChallengesCollection.createTestData({
        name: "Operação",
        body: `Qual será o output do seguinte código?

\`\`\`        
print(10 * 5)
\`\`\`
`,
        type: ChallengeType.RADIO,
        selection: [
            "15",
            "5",
            "50",
            "2",
            "Nenhuma das alternativas acima"
        ],
        correct: ["2"],
        points: 10,
        category: "ops",
        feedback: "Isso é um feedback!"
    });

    await ChallengesCollection.createTestData({
        name: "Operação",
        body: `Qual será o valor da variável valor após a execução do seguinte código?

\`\`\`
valor = 1
valor++
\`\`\`
`,
        type: ChallengeType.RADIO,
        selection: [
            "2",
            "1",
            "0",
            "Nenhuma das alternativas acima"
        ],
        correct: ["3"],
        points: 10,
        category: "ops",
        feedback: "Isso é um feedback!"
    });

    await ChallengesCollection.createTestData({
        name: "If",
        body: `Qual será o output do seguinte código Python?
        
\`\`\`        
if 'a' == 'A':
    print('sim')
else:
    print('não')
\`\`\`    
`,
        type: ChallengeType.RADIO,
        selection: [
            "sim",
            "não",
            "Erro"
        ],
        correct: ["1"],
        points: 10,
        category: "ifelse",
        feedback: "Isso é um feedback!"
    });

    await ChallengesCollection.createTestData({
        name: "elif",
        body: `Qual será o output do seguinte código?

\`\`\`
a = 2
b = ''

if(a == 1):
    b += 'um'
elif(a == 2):
    b += 'dois'
elif(a == 3):
    b += 'tres'
\`\`\`
`,
        type: ChallengeType.RADIO,
        selection: [
            "Em branco",
            "um",
            "dois",
            "tres",
            "Erro"
        ],
        correct: ["0"],
        points: 10,
        category: "ifelse",
        feedback: "Isso é um feedback!"
    });

    await ChallengesCollection.createTestData({
        name: "Loops",
        body: `Quantas iterações do loop serão executadas no código abaixo?

\`\`\`
for i in range(1, 5):
    print(i)
\`\`\`
`,
        type: ChallengeType.RADIO,
        selection: [
            "Nenhuma",
            "1",
            "2",
            "3",
            "4",
            "5",
            "Erro"
        ],
        correct: ["4"],
        points: 10,
        category: "loop",
        feedback: "Isso é um feedback!"
    });

    console.log("challenges created");
}