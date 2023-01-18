import { ParticipantStatus } from "./enum/ParticipantStatus";

export interface IParticipant {
    userId: string;
    points: number;
    status: ParticipantStatus;
}