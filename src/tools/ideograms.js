import { Tool } from "experts";
import { readInstructions } from "../utils/instructions.js";
import { MagicPromptsTool } from "./magicPrompts.js";
import { conceptsParameters } from "../utils/conceptsParameters.js";

class IdeogramsTool extends Tool {
  constructor() {
    const name = "unREMARKABLE Ideogram (Ideograms)";
    const description =
      "Using your creative concepts, create on-brand magic prompts and use them to open Ideogram in a browser.";
    const instructions = readInstructions("ideograms.md");
    const parentsTools = [
      {
        type: "function",
        function: {
          name: IdeogramsTool.toolName,
          description: description,
          parameters: conceptsParameters,
        },
      },
    ];
    super(name, description, instructions, {
      parentsTools: parentsTools,
    });
    this.addAssistantTool(MagicPromptsTool);
  }
}

export { IdeogramsTool };
