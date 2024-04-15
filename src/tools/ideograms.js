import { Tool } from "../mini-assistants/tool.js";
import { readInstructions } from "../utils/instructions.js";

class IdeogramsTool extends Tool {
  constructor() {
    const name = "unREMARKABLE Ideogram (Ideogram)";
    const description =
      "Thur your illustration's magic prompts into images for the customer to review.";
    const instructions = "";
    const parentsTools = [
      {
        type: "function",
        function: {
          name: IdeogramsTool.toolName,
          description: description,
          parameters: {
            type: "object",
            properties: {
              magic_prompts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    content: {
                      type: "string",
                      description: "The magic prompt to send to Ideogram.",
                    },
                  },
                  required: ["content"],
                },
              },
            },
            required: ["magic_prompts"],
          },
        },
      },
    ];
    super(name, description, instructions, {
      llm: false,
      parentsTools: parentsTools,
    });
  }

  async ask(message, threadID) {
    console.log("IdeogramsTool ask");
    console.log("message", message);
  }
}

export { IdeogramsTool };
