export interface ITopic {
    name: string;
    icon: string;
    subtopics: {
        name: string;
        description: string;
        challenges: [];
    }[];
}