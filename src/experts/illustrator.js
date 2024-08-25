const openImport = import("open");
const ideogram = require("@api/ideogram");
const { z } = require("zod");
const { Assistant, Tool, Thread } = require("experts");
const { zodResponseFormat } = require("openai/helpers/zod");
const { readInstructions } = require("../utils/instructions.js");

ideogram.auth(process.env.IDEOGRAM_API_KEY);

class BrandingRulesAssistant extends Assistant {
  constructor() {
    super({
      name: "unRemarkable.ai Ad Agency (Branding Rules)",
      instructions:
        "Apply brand and creative style rules to illustration descriptions.",
      temperature: 0.1,
      response_format: zodResponseFormat(
        z
          .object({ illustration_description: z.string() })
          .describe(
            "An concept that is now on-brand and fully described for an illustrator."
          ),
        "illustration_description"
      ),
    });
  }
}

const STYLE_PREFIX =
  "A minimalist and abstract illustration, hand-drawn with bold, heavy strokes in black marker.";

class IllustratorTool extends Tool {
  constructor() {
    super({
      name: "unRemarkable.ai Ad Agency (Illustrator)",
      instructions: readInstructions("illustrator.md"),
      temperature: 0.1,
      parentsTools: [
        {
          type: "function",
          function: {
            name: "illustrator",
            description:
              "Using a single creative concept, create a final on-brand illustration shown in a browser window.",
            parameters: {
              type: "object",
              properties: {
                concept: { type: "string" },
              },
              required: ["concept"],
            },
          },
        },
      ],
      response_format: zodResponseFormat(
        z
          .object({
            rules: z.array(
              z.object({
                rule: z.string(),
              })
            ),
          })
          .describe(
            "An array of rules for creating on-brand illustration descriptions."
          ),
        "rules"
      ),
    });
  }

  async beforeAsk(message) {
    const concept = JSON.parse(message).concept;
    console.log(`💭 Concept:\n${concept}`);
    return concept;
  }

  async answered(rules) {
    const illustrationDescription = await this.#applyBrandRules(rules);
    const finalPrompt = `${STYLE_PREFIX} ${illustrationDescription}`;
    console.log(`💡 Prompt:\n${finalPrompt}`);
    const ideograms = await ideogram.post_generate_image({
      image_request: {
        prompt: finalPrompt,
        magic_prompt_option: "OFF",
        style_type: "GENERAL",
        resolution: "RESOLUTION_1312_736",
      },
    });
    const open = (await openImport).default;
    for (const item of ideograms.data.data) {
      await open(item.url);
    }
    return "Success";
  }

  async afterInit() {
    this.brandingRulesAssistant = await BrandingRulesAssistant.create();
  }

  async #applyBrandRules(rules) {
    rules = JSON.parse(rules)
      .rules.map((rule) => `- ${rule.rule}`)
      .join("\n");
    console.log(`📐 Rules:\n${rules}`);
    const thread = await Thread.create();
    const response = await this.brandingRulesAssistant.ask(
      `Rules:\n\n${rules}`,
      thread.id
    );
    return JSON.parse(response).illustration_description;
  }
}

module.exports = { IllustratorTool };
