import { Tool } from "experts";
import { readInstructions } from "../utils/instructions.js";
import { MagicPromptTool } from "./magicPrompt.js";
import { conceptParameter } from "../utils/conceptParameter.js";

class IdeogramTool extends Tool {
  constructor() {
    super({
      name: "unREMARKABLE Ideogram (Ideograms)",
      instructions: readInstructions("ideogram.md"),
      temperature: 0.1,
      parentsTools: [
        {
          type: "function",
          function: {
            name: "ideogram",
            description:
              "Using a single creative concept, create on-brand magic prompts and open with Ideogram in a browser.",
            parameters: conceptParameter,
          },
        },
      ],
    });
    this.addAssistantTool(MagicPromptTool);
  }
}

export { IdeogramTool };
