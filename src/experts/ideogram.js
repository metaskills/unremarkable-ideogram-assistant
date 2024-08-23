import open from "open";
import ideogram from "@api/ideogram";
import { z } from "zod";
import { Tool } from "experts";
import { zodResponseFormat } from "openai/helpers/zod";
import { readInstructions } from "../utils/instructions.js";

class IdeogramTool extends Tool {
  constructor() {
    super({
      name: "unREMARKABLE Ideogram (Ideograms)",
      instructions: readInstructions("ideogram.md"),
      temperature: 0.1,
      parentsTools: [
        {
          type: "function",
          function: {
            name: "ideogram",
            description:
              "Using a single creative concept, create on-brand magic prompts for Ideogram and preview them in a browser.",
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
          .describe("A single magic with your illustration style."),
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
    const urls = myIdeograms.data.map((item) => item.url);
    await open(urls, {
      app: { name: "google chrome", arguments: ["--new-window"] },
    });
  }
}

export { IdeogramTool };
