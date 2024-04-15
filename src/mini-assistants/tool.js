import { Assistant } from "./assistant.js";

class Tool extends Assistant {
  static get toolName() {
    return this.name
      .replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`)
      .slice(1);
  }

  constructor(agentName, description, instructions, options = {}) {
    super(agentName, description, instructions, options);
    this.isTool = true;
    this.hasToolThread =
      options.hasToolThread !== undefined ? options.hasToolThread : true;
    this.assistantsToolsPassOutputs =
      options.assistantsToolsPassOutputs !== undefined
        ? options.assistantsToolsPassOutputs
        : false;
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
