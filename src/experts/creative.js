import { Assistant } from "experts";
import { readInstructions } from "../utils/instructions.js";
import { IdeogramTool } from "./ideogram.js";

class CreativeAssistant extends Assistant {
  constructor() {
    super({
      name: "unREMARKABLE Ideogram (Creative)",
      instructions: readInstructions("creative.md"),
      temperature: 0.1,
    });
    this.addAssistantTool(IdeogramTool);
  }
}

export { CreativeAssistant };
