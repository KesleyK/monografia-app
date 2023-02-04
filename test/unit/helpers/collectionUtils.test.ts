import { initializeApp } from "firebase/app";
import { collection, connectFirestoreEmulator, doc, DocumentData, getDocs, getFirestore, QuerySnapshot, setDoc } from "firebase/firestore";

let ref;
let altRef;

const data = [
    { name: "Test1", age: 20 },
    { name: "Test2", age: 21 },
    { name: "Test3", age: 22 },
    { name: "Test4", age: 23 },
    { name: "Test5", age: 24 },
];

beforeAll(async () => {
    initializeApp({ projectId: "monografia-app" });

    const db = getFirestore();
    connectFirestoreEmulator(db, 'localhost', 8080);

    ref = collection(db, "test");
    altRef = collection(db, "test2");

    for (const item of data) {
        await setDoc(doc(ref), item);
    }
});

test("parseCollection should parse the data correctly", async () => {
    const retrieved = await getDocs(ref) as QuerySnapshot<DocumentData>;
    const parsed = parseCollection(retrieved).map((item) => {
        return { name: item.name, age: item.age };
    });

    expect(parsed.sort(byAge)).toEqual(data.sort(byAge));
});

test("parseCollection with empty query should return an empty list", async () => {
    const retrieved = await getDocs(altRef) as QuerySnapshot<DocumentData>;

    expect(parseCollection(retrieved).length).toBe(0);
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

function byAge(a, b) {
    return a.age - b.age;
}
