import { ChallengeType } from "../../models/enum/ChallengeType";
import ChallengesCollection from "../../services/firebase/db/challenges";

export default async () => {
    await ChallengesCollection.createTestData({
        name: "Hello World",
        body: "Insira no código a seguir, o trecho que falta para que seja produzido o output Hello World:\n\n___(\"Hello World\")",
        type: ChallengeType.RADIO,
        selection: [
            "console.log",
            "produce",
            "print",
            "write",
            "say"
        ],
        correct: ["2"],
        points: 10,
        category: "io"
    });

    await ChallengesCollection.createTestData({
        name: "Hello World",
        body: "Insira no código a seguir, o trecho que falta para que seja produzido o output Hello World:\n\n___(\"Hello World\")",
        type: ChallengeType.CHECKBOX,
        selection: [
            "console.log",
            "produce",
            "print",
            "write",
            "say"
        ],
        correct: ["2"],
        points: 10,
        category: "io"
    });

    await ChallengesCollection.createTestData({
        name: "Hello World",
        body: "Insira no código a seguir, o trecho que falta para que seja produzido o output Hello World:\n\n___(\"Hello World\")",
        type: ChallengeType.INPUT,
        selection: [],
        correct: ["print"],
        points: 10,
        category: "io"
    });

    await ChallengesCollection.createTestData({
        name: "input",
        body: "O que faz o seguinte código?\n\nvalor = input()",
        type: ChallengeType.RADIO,
        selection: [
            "Atribui um valor pré-determinado à variável",
            "Envia um valor para o usuário",
            "Atribui o valor digitado pelo usuário na variável",
            "Nenhuma das alternativas acima"
        ],
        correct: ["2"],
        points: 5,
        category: "io"
    });

    await ChallengesCollection.createTestData({
        name: "input",
        body: "Qual será o output do código a seguir?\n\ninput(\"Digite a sua idade:\")\n\nprint(\"Sua idade é\", idade)",
        type: ChallengeType.RADIO,
        selection: [
            "10",
            "Valor digitado pelo usuário",
            "\"Sua idade é\", seguido pelo valor digitado pelo usuário",
            "Erro"
        ],
        correct: ["3"],
        points: 10,
        category: "io"
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
        category: "ops"
    });

    await ChallengesCollection.createTestData({
        name: "Operação",
        body: "Qual será o output do seguinte código?\n\nprint(10 * 5)",
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
        category: "ops"
    });

    await ChallengesCollection.createTestData({
        name: "Operação",
        body: "Qual será o valor da variável valor após a execução do seguinte código?\n\nvalor = 1\nvalor++",
        type: ChallengeType.RADIO,
        selection: [
            "2",
            "1",
            "0",
            "Nenhuma das alternativas acima"
        ],
        correct: ["3"],
        points: 10,
        category: "ops"
    });

    await ChallengesCollection.createTestData({
        name: "If",
        body: "Qual será o output do seguinte código Python?\n\nif 'a' == 'A':\n\tprint('sim')\nelse:\n\tprint('não')",
        type: ChallengeType.RADIO,
        selection: [
            "sim",
            "não",
            "Erro"
        ],
        correct: ["1"],
        points: 10,
        category: "ifelse"
    });

    await ChallengesCollection.createTestData({
        name: "elif",
        body: "Qual será o output do seguinte código?\n\na = 2\nb = ''\n\nif(a == 1):\n\tb += 'um'\nelif(a == 2):\n\tb += 'dois'\nelif(a == 3):\n\tb += 'tres'",
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
        category: "ifelse"
    });

    await ChallengesCollection.createTestData({
        name: "Loops",
        body: "Quantas iterações do loop serão executadas no código abaixo?\n\nfor i in range(1, 5):\n\tprint(i)",
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
        category: "loop"
    });

    console.log("challenges created");
}