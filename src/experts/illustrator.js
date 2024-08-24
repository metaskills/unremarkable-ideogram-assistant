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
        z.object({ illustration_description: z.string() })
         .describe("An concept that is now on-brand and fully described for an illustrator."),
        "illustration_description"
      ),
    });
  }

  async answered(output) {
    const prompt = JSON.parse(output).illustration_description;
    const ideograms = await ideogram.post_generate_image({
      image_request: {
        prompt: prompt,
        magic_prompt_option: "OFF",
        style_type: "GENERAL",
        resolution: "RESOLUTION_1312_736",
        negative_prompt: "brush paint"
      },
    });
    const open = (await openImport).default;
    for (const item of ideograms.data.data) {
      await open(item.url);
    }
    return "Success";
  }
}

module.exports = { IllustratorTool };
