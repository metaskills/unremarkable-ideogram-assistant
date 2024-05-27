import { Tool } from "experts";
import { execSync } from "child_process";

class OpenBrowserTool extends Tool {
  constructor() {
    const name = "unREMARKABLE Ideogram (Open Browser)";
    const description =
      "Open a browser window to Ideogram for each magic prompt.";
    const instructions = "";
    const parentsTools = [
      {
        type: "function",
        function: {
          name: OpenBrowserTool.toolName,
          description: description,
          parameters: {
            type: "object",
            properties: {
              magic_prompts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    prompt: {
                      type: "string",
                      description:
                        "The Ideogram magic prompt to send to your browser. Single sentence, no backticks",
                    },
                  },
                  required: ["content"],
                },
              },
            },
            required: ["magic_prompts"],
          },
        },
      },
    ];
    super(name, description, instructions, {
      llm: false,
      parentsTools: parentsTools,
    });
  }

  async ask(magicPromptsJSON) {
    const json = JSON.parse(magicPromptsJSON);
    for (const magicPrompt of json.magic_prompts) {
      await this.openBrowser(magicPrompt.prompt);
    }
    return "";
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
    keystroke "${cleanedPrompt}"
    delay 1
    keystroke return
end tell
    `.trim();
  }
}

export { OpenBrowserTool };
