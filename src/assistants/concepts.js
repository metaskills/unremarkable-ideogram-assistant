import { Assistant } from "../mini-assistants/assistant.js";
import { readInstructions } from "../utils/instructions.js";
import { MagicPromptsTool } from "../tools/magicPrompts.js";
import { IdeogramsTool } from "../tools/ideograms.js";

class ConceptsAssistant extends Assistant {
  constructor() {
    const name = "unREMARKABLE Ideogram (Concepts)";
    const description = "Turn your ideas into on-brand ideograms.";
    const instructions = readInstructions("concepts.md");
    super(name, description, instructions);
    this.addAssistantTool(MagicPromptsTool);
    this.addAssistantTool(IdeogramsTool);
  }
}

export { ConceptsAssistant };
