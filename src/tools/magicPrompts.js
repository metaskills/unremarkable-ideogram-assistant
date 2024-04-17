import { Tool } from "../mini-assistants/tool.js";
import { readInstructions } from "../utils/instructions.js";
import { conceptsParameters } from "../utils/conceptsParameters.js";

class MagicPromptsTool extends Tool {
  constructor() {
    const name = "unREMARKABLE Ideogram (Magic Prompts)";
    const description =
      "Turn your concepts and illustration descriptions into magic prompts for use with Ideogram";
    const instructions = readInstructions("magicPrompts.md");
    const parentsTools = [
      {
        type: "function",
        function: {
          name: MagicPromptsTool.toolName,
          description: description,
          parameters: conceptsParameters,
        },
      },
    ];
    super(name, description, instructions, {
      parentsTools: parentsTools,
    });
  }
}

export { MagicPromptsTool };
