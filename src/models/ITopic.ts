import { IChallenge } from "./IChallenge";

export interface ITopic {
    name: string;
    icon: string;
    subtopics: {
        name: string;
        description: string;
        challenges: IChallenge[];
    }[];
}