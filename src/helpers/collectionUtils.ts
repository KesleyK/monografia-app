import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ParticipantStatus } from "../models/enum/ParticipantStatus";
import { ITeam } from "../models/ITeam";
import ParticipantsCollection from "../services/firebase/db/participants";
import UsersCollection from "../services/firebase/db/users";

export const parseCollection = (info: QuerySnapshot<DocumentData>) => {
    if (info.empty) {
        return [];
    }
    
    const arr = [];

    info.forEach((doc: DocumentData) => {
        arr.push({ id: doc.id, ...doc.data() });
    });

    return arr;
}

export function isGlobalPlatform(team: ITeam) {
    return team.ownerId === "main";
}

export async function createRanking(team, limit: number = null) {
    if (isGlobalPlatform(team)) {
        const usersInfo = await UsersCollection.getAll(limit);
        return parseCollection(usersInfo);
    }

    const participantsInfo = await ParticipantsCollection.findByTeam(team.id, limit);
    const participants = parseCollection(participantsInfo)
        .filter(participant => participant.status === ParticipantStatus.ACCEPTED);

    const usersInfo = await UsersCollection.getMultiple(participants.map(item => item.userId))
    const personArray = parseCollection(usersInfo);

    participants.forEach(participant => {
        const personInfo = personArray.find(person => participant.userId === person.id);
        personInfo.points = participant.points;
    });

    personArray.sort((a, b) => b.points - a.points);

    return personArray;
}

export function earnPoints(userId: string, points: number, participantId: string = null) {
    if (!participantId) {
        return UsersCollection.acquirePoints(userId, points);
    }

    ParticipantsCollection.acquirePoints(participantId, points);
}
