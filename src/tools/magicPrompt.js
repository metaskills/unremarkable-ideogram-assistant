import { Tool } from "experts";
import { readInstructions } from "../utils/instructions.js";
import { conceptParameter } from "../utils/conceptParameter.js";
import { execSync } from "child_process";

class MagicPromptTool extends Tool {
  constructor() {
    super({
      name: "unREMARKABLE Ideogram (Magic Prompts)",
      instructions: readInstructions("magicPrompt.md"),
      temperature: 0.1,
      parentsTools: [
        {
          type: "function",
          function: {
            name: "magic_prompt",
            description:
              "Turn your concepts and illustration descriptions into magic prompts for use with Ideogram",
            parameters: conceptParameter,
          },
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "open_browser",
            description:
              "Open a browser window to Ideogram for a magic prompt.",
            parameters: {
              type: "object",
              properties: {
                magic_prompt: {
                  type: "string",
                  description:
                    "The Ideogram magic prompt to send to your browser. Single sentence, no backticks",
                },
              },
              required: ["magic_prompt"],
            },
          },
        },
      ],
    });
  }

  async ask(message, threadID, options = {}) {
    let json;
    try {
      json = JSON.parse(message);
    } catch (error) {}
    if (json.magic_prompt) {
      await this.openBrowser(json.magic_prompt);
      return "Success";
    } else {
      return super.ask(message, threadID, options);
    }
  }

  async openBrowser(magicPrompt) {
    const cmd = `osascript -e '${this.template(magicPrompt)}'`;
    execSync(cmd);
  }

  template(magicPrompt) {
    let cleanedPrompt = magicPrompt.replace(/"/g, '\\"');
    cleanedPrompt = cleanedPrompt.replace(/'/g, '\\"');
    return `
tell application "Safari"
    activate
    make new document
    set URL of document 1 to "https://ideogram.ai"
end tell
delay 2
tell application "System Events"
    keystroke tab
    keystroke "${cleanedPrompt}"
    delay 1
    keystroke return
end tell
    `.trim();
  }
}

export { MagicPromptTool };
