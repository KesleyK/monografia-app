export interface ITeam {
    name: string;
    description: string;
    ownerId: string;
    participants: Array<string>;
    topics: Array<string>;
}