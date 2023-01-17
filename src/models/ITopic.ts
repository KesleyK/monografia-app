
export interface ITopic {
    name: string;
    icon: string;
    isSequential?: boolean;
    subtopics: {
        name: string;
        description: string;
        challenges: string[];
    }[];
}