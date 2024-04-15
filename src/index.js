import { input, checkbox } from "@inquirer/prompts";
import { Thread } from "./mini-assistants/thread.js";
import { ConceptsAssistant } from "./assistants/concepts.js";

const thread = await Thread.create();
const assistant = await ConceptsAssistant.create();

let userInput, assistantOutput;

userInput = await input({
  message: "How can I assist you today with your creative needs?\n📩",
});

while (true) {
  assistantOutput = await assistant.ask(userInput, thread.id);
  let json;
  try {
    json = JSON.parse(assistantOutput);
  } catch (error) {}
  const assistantResponse = json?.assistant_response || assistantOutput;
  console.log(`💁‍♀️ ${assistantResponse}\n`);
  if (json?.concepts?.length > 0) {
    const selectedConcepts = await checkbox({
      message: "🧠 Concepts:",
      choices: json.concepts.map((c) => ({
        name: `${c.concept} (${c.thinking})`,
        value: c.concept,
        pageSize: 20,
      })),
    });
    console.log("selectedConcepts: ", selectedConcepts);
    userInput = await input({
      message: `💁‍♀️ ${assistantResponse}\n`,
    });
  } else {
    userInput = await input({
      message: `💁‍♀️ ${assistantResponse}\n📩`,
    });
    console.log("userInput: ", userInput);
  }
}
