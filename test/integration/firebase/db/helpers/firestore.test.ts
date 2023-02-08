import { initializeApp } from "firebase/app";
import { collection, connectFirestoreEmulator, doc, DocumentData, getDocs, getFirestore, QuerySnapshot, setDoc } from "firebase/firestore";
import { EducationalBackground } from "../../../../../src/models/enum/EducationalBackground";
import { ParticipantStatus } from "../../../../../src/models/enum/ParticipantStatus";
import { ChallengeType } from "../../../../../src/models/enum/ChallengeType";

let challengeReports;
let challenges;
let participants;
let subtopics;
let teams;
let topics;
let users;

beforeAll(async () => {
    initializeApp({ projectId: "monografia-app" });

    const db = getFirestore();
    connectFirestoreEmulator(db, 'localhost', 8080);

    challengeReports = collection(db, "challengeReports");
    challenges = collection(db, "challenges");
    participants = collection(db, "participants");
    subtopics = collection(db, "subtopics");
    teams = collection(db, "teams");
    topics = collection(db, "topics");
    users = collection(db, "users");
});

test("users collection", async () => {
    await setDoc(doc(users, "pedenite@gmail.com"), {
        name: "Pedro",
        educationalBackground: EducationalBackground.GRADUATION_INCOMPLETE,
        birthDate: new Date(),
        email: "pedenite@gmail.com",
        points: 0
    });

    await setDoc(doc(users, "kesley.kenny.kk@gmail.com"), {
        name: "Kesley",
        educationalBackground: EducationalBackground.GRADUATION_INCOMPLETE,
        birthDate: new Date(),
        email: "kesley.kenny.kk@gmail.com",
        points: 0
    });

    const retrieved = await getDocs(users) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved);
    expect(parsed.length).toBe(2);
});

test("teams collection", async () => {
    await setDoc(doc(teams), {
        name: "Time de teste",
        description: "Descrição",
        ownerId: "pedenite@gmail.com",
        participants: ["1"],
        topics: ["1"]
    });

    const retrieved = await getDocs(teams) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved);
    expect(parsed.length).toBe(1);
});

test("participants collection", async () => {
    await setDoc(doc(participants), {
        userId: "kesley.kenny.kk@gmal.com",
        points: 10,
        status: ParticipantStatus.ACCEPTED,
        teamId: "1"
    });

    const retrieved = await getDocs(participants) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved);
    expect(parsed.length).toBe(1);
});

test("topics collection", async () => {
    await setDoc(doc(topics), {
        name: "Tópico de teste",
        icon: "language-python",
        isSequential: true,
        subtopics: ["1", "2"]
    });

    const retrieved = await getDocs(topics) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved);
    expect(parsed.length).toBe(1);
});

test("subtopics collection", async () => {
    await setDoc(doc(subtopics), {
        name: "Subtópico 1",
        description: "Descrição",
        challenges: ["1", "2", "3"]
    });

    await setDoc(doc(subtopics), {
        name: "Subtópico 2",
        description: "Nova Descrição",
        challenges: ["4"]
    });

    const retrieved = await getDocs(subtopics) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved);
    expect(parsed.length).toBe(2);
});

test("challenges collection", async () => {
    await setDoc(doc(challenges), {
        name: "Desafio 1",
        body: "Responda a pergunta",
        type: ChallengeType.CHECKBOX,
        selection: [
            "Opção 1",
            "Opção 2",
            "Opção 3"
        ],
        correct: ["0", "2"],
        points: 10,
        feedback: "Resposta correta"
    });

    await setDoc(doc(challenges), {
        name: "Desafio 2",
        body: "Responda a pergunta",
        type: ChallengeType.INPUT,
        selection: [],
        correct: ["Resposta"],
        points: 5
    });

    await setDoc(doc(challenges), {
        name: "Desafio 3",
        body: "Marque as corretas",
        type: ChallengeType.RADIO,
        selection: [
            "Opção 1",
            "Opção 2",
            "Opção 3"
        ],
        correct: ["1"],
        points: 10,
        feedback: "Resposta correta"
    });

    await setDoc(doc(challenges), {
        name: "Desafio 4",
        body: "Responda a pergunta",
        type: ChallengeType.INPUT,
        selection: [],
        correct: ["Correta"],
        points: 15,
        feedback: "Parabéns"
    });

    const retrieved = await getDocs(challenges) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved);
    expect(parsed.length).toBe(4);
});

test("challengeReports collection", async () => {
    await setDoc(doc(challengeReports), {
        userId: "kesley.kenny.kk@gmail.com",
        challengeId: "3",
        answer: ["1"],
        answeredCorrectly: true
    });

    await setDoc(doc(challengeReports), {
        userId: "kesley.kenny.kk@gmail.com",
        challengeId: "2",
        answer: ["Errado"],
        answeredCorrectly: false
    });

    const retrieved = await getDocs(challengeReports) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved);
    expect(parsed.length).toBe(2);
});

function parseCollection(info: QuerySnapshot<DocumentData>) {
    if (info.empty) {
        return [];
    }

    const arr: any[] = [];

    info.forEach((doc: DocumentData) => {
        arr.push({ id: doc.id, ...doc.data() });
    });

    return arr;
}
