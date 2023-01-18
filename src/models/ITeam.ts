import { IParticipant } from "./IParticipant";

export interface ITeam {
    name: string;
    description: string;
    ownerId: string;
    participants: Array<IParticipant>;
    topics: Array<string>;
}