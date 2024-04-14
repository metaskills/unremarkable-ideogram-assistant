import { ConceptsAssistant } from "./assistants/concepts.js";
import { Thread } from "./mini-assistants/thread.js";

const thread = await Thread.create();
const assistant = await ConceptsAssistant.create();

await assistant.ask("Hey, good morning.", thread.id);
