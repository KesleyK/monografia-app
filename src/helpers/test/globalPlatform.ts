import ChallengesCollection from "../../services/firebase/db/challenges";
import SubtopicsCollection from "../../services/firebase/db/subtopics";
import TeamsCollection from "../../services/firebase/db/teams";
import TopicsCollection from "../../services/firebase/db/topics";

export async function createPythonCourse() {
    const topic = require("../../../data/python/topic.json");
    const subtopics = require("../../../data/python/subtopics.json");
    const challenges = require("../../../data/python/challenges.json");
    
    const challengesCreated = [];
    const subtopicsCreated = [];

    for (const challenge of challenges) {
        challengesCreated.push(await ChallengesCollection.createTestData(challenge));
    }

    challengesCreated.sort(sortByOrder);

    for (const subtopic of subtopics) {
        subtopic.challenges = challengesCreated.filter((item) => item.category === subtopic.category).map(extractId);
        subtopicsCreated.push(await SubtopicsCollection.createTestData(subtopic));
    }

    subtopicsCreated.sort(sortByOrder)

    topic.subtopics = subtopicsCreated.map(extractId);
    const topicCreated = TopicsCollection.createTestData(topic);

    TeamsCollection.addGlobalCourse(topicCreated.id);

    console.log("created");
}

function sortByOrder(a, b) {
    return a.order - b.order;
}

function extractId (item) {
    return item.id;
}