import { Assistant } from "../mini-assistants/assistant.js";
import { readInstructions } from "../utils/instructions.js";
import { IdeogramsTool } from "../tools/ideograms.js";

class CreativeAssistant extends Assistant {
  constructor() {
    const name = "unREMARKABLE Ideogram (Creative)";
    const description =
      "Turn your customer's subject needs along with your concepts, thinking, & illustration descriptions into ideogram images.";
    const instructions = readInstructions("creative.md");
    super(name, description, instructions);
    this.addAssistantTool(IdeogramsTool);
  }
}

export { CreativeAssistant };
