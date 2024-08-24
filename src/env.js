const url = require("url");
const path = require("path");
const { config } = require("dotenv-flow");
config({ silent: true });

const STAGE = process.env.STAGE_ENV || process.env.NODE_ENV || "development";
const PROJECT_BASE_PATH = path.resolve(__dirname, "..");

class Env {
  constructor() {
    this.stage = STAGE;
  }

  log(message) {
    console.log(message);
  }

  projectPath(filePath) {
    return path.join(PROJECT_BASE_PATH, filePath);
  }
}

module.exports = new Env();
