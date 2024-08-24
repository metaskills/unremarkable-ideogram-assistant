const { Assistant } = require("experts");
const { readInstructions } = require("../utils/instructions.js");
const { IllustratorTool } = require("./illustrator.js");

class CreativeAssistant extends Assistant {
  constructor() {
    super({
      name: "unRemarkable.ai Ad Agency (Creative)",
      instructions: readInstructions("creative.md"),
      temperature: 0.1,
    });
    this.addAssistantTool(IllustratorTool);
  }
}

module.exports = { CreativeAssistant };
