import { Tool } from "../mini-assistants/tool.js";
import { readInstructions } from "../utils/instructions.js";

class MagicPromptsTool extends Tool {
  constructor() {
    const name = "unREMARKABLE Ideogram (Magic Prompts)";
    const description =
      "Turn your customer's needs along with your concepts, thinking, & illustration descriptions into ideogram magic prompts.";
    const instructions = readInstructions("magicPrompts.md");
    const parentsTools = [
      {
        type: "function",
        function: {
          name: MagicPromptsTool.toolName,
          description: description,
          parameters: {
            type: "object",
            properties: {
              concepts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    subject: {
                      type: "string",
                      description:
                        "Few words summarizing the customer's need for this concept.",
                    },
                    concept: {
                      type: "string",
                      description:
                        "Brief idea of the concept. Single sentence.",
                    },
                    thinking: {
                      type: "string",
                      description:
                        "Your detailed thinking thinking behind the concept.",
                    },
                    illustration_description: {
                      type: "string",
                      description: "Detailed description of the illustration.",
                    },
                  },
                  required: [
                    "subject",
                    "concept",
                    "thinking",
                    "illustration_description",
                  ],
                },
              },
            },
            required: ["concepts"],
          },
        },
      },
    ];
    super(name, description, instructions, {
      toolThread: true,
      parentsTools: parentsTools,
    });
  }
}

export { MagicPromptsTool };
