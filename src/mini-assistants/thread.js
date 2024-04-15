import { debug } from "./helpers.js";
import { openai } from "./openai.js";
import { Message } from "./messages.js";

class Thread {
  static async find(threadID) {
    const thread = await openai.beta.threads.retrieve(threadID);
    return new Thread(thread);
  }

  static async create() {
    const thrd = await openai.beta.threads.create();
    debug("🧵 " + JSON.stringify(thrd));
    const thread = new Thread(thrd);
    return thread;
  }

  constructor(thread) {
    this.thread = thread;
  }

  get id() {
    return this.thread.id;
  }

  async toolThread(tool) {
    let thread;
    const threadKey = tool.toolName;
    const threadID = this.thread.metadata[threadKey];
    if (!threadID) {
      thread = await Thread.create();
      await this.addSubThread(threadKey, thread);
    } else {
      thread = await Thread.find(threadID);
    }
    return thread;
  }

  async assistantMessageContent() {
    const message = await this.assistantMessage();
    return await message.assistantContent();
  }

  // Private (Lifecycle)

  async addSubThread(threadKey, thread) {
    this.thread.metadata[threadKey] = thread.id;
    await openai.beta.threads.update(this.id, {
      metadata: this.thread.metadata,
    });
  }

  // Private

  // Only called after a completed run or submitting tool outputs.
  // TODO: Likely will be moot with streaming and need new approach.
  //
  async assistantMessage() {
    const options = { limit: 1 };
    const messages = await openai.beta.threads.messages.list(this.id, options);
    const message = new Message(messages.data[0], this);
    if (!message.isAssistant) {
      throw new Error("ExpectedAssistantMessageError");
    }
    return message;
  }
}

export { Thread };
