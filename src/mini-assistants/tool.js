import { Assistant } from "./assistant.js";

class Tool extends Assistant {
  static get toolName() {
    return this.name
      .replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`)
      .slice(1);
  }

  constructor(agentName, description, instructions, options = {}) {
    super(agentName, description, instructions, options);
    this.assistantsToolsPassOutputs =
      options.assistantsToolsPassOutputs || false;
    this.parentsTools = options.parentsTools || [];
  }

  get toolName() {
    return this.constructor.toolName;
  }

  get isParentsTools() {
    return this.parentsTools && this.parentsTools.length > 0;
  }
}

export { Tool };
