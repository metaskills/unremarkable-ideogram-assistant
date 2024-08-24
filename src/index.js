const { input } = require("@inquirer/prompts");
const { Thread } = require("experts");
const { CreativeAssistant } = require("./experts/creative.js");

async function main() {
  const thread = await Thread.create();
  const assistant = await CreativeAssistant.create();
  await thread.addMetaData({"assistant": assistant.agentName});

  let userInput, assistantOutput;

  userInput =
    process.env.IDEA ||
    (await input({
      message: "How can I assist you today with your creative needs?\n📩",
    }));

  while (true) {
    assistantOutput = await assistant.ask(userInput, thread.id);
    userInput = await input({
      message: `💁‍♀️ ${assistantOutput}\n📩`,
    });
  }
}

main().catch(console.error);
