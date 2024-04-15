import { input } from "@inquirer/prompts";
import { Thread } from "./mini-assistants/thread.js";
import { ConceptsAssistant } from "./assistants/concepts.js";

const thread = await Thread.create();
const assistant = await ConceptsAssistant.create();

let userInput, assistantOutput;

userInput = await input({
  message: "How can I assist you today with your creative needs?",
});

while (true) {
  assistantOutput = await assistant.ask(userInput, thread.id);
  userInput = await input({
    message: `💁‍♀️ ${assistantOutput}\n`,
  });
}
