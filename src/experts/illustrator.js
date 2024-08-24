const openImport = import('open');
const ideogram = require("@api/ideogram");
const { z } = require("zod");
const { Tool } = require("experts");
const { zodResponseFormat } = require("openai/helpers/zod");
const { readInstructions } = require("../utils/instructions.js");

ideogram.auth(process.env.IDEOGRAM_API_KEY);

class IllustratorTool extends Tool {
  constructor() {
    super({
      name: "unREMARKABLE Ideogram (Illustrator)",
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
                concept: {
                  type: "object",
                  properties: {
                    subject: {
                      type: "string",
                      description:
                        "Few words summarizing the customer's need for this concept.",
                    },
                    concept: {
                      type: "string",
                      description:
                        "Brief idea of the concept. Single sentence.",
                    },
                    thinking: {
                      type: "string",
                      description:
                        "Your detailed thinking thinking behind the concept.",
                    },
                    illustration_description: {
                      type: "string",
                      description: "Detailed description of the illustration.",
                    },
                  },
                  required: [
                    "subject",
                    "concept",
                    "thinking",
                    "illustration_description",
                  ],
                },
              },
              required: ["concept"],
            },
          },
        },
      ],
      response_format: zodResponseFormat(
        z
          .object({
            magic_prompt: z.string(),
          })
          .describe("A single magic prompt with your illustration style."),
        "magic_prompt"
      ),
    });
  }

  async answered(output) {
    const magicPrompt = JSON.parse(output).magic_prompt;
    const myIdeograms = await ideogram.post_generate_image({
      image_request: {
        prompt: magicPrompt,
        magic_prompt_option: "OFF",
        style_type: "DESIGN",
        resolution: "RESOLUTION_1312_736",
      },
    });
    const open = (await openImport).default;
    for (const item of myIdeograms.data.data) {
      await open(item.url);
    }
    return "Success";
  }
}

module.exports = { IllustratorTool };
