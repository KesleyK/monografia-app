import { ChallengeType } from "../../models/enum/ChallengeType";
import ChallengesCollection from "../../services/firebase/db/challenges";

export default async () => {
    await ChallengesCollection.createTestData({
        name: "Teste",
        body: "Favor responda",
        type: ChallengeType.RADIO,
        selection: ["Escolha 1", "Escolha 2", "Escolha 3"],
        correct: "1",
        points: 10
    });

    console.log("challenge created");
}