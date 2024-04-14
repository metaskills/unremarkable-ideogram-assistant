import url from "url";
import path from "path";
import { config } from "dotenv-flow";
config({ silent: true });

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STAGE = process.env.STAGE_ENV || process.env.NODE_ENV || "development";
const PROJECT_BASE_PATH = path.resolve(__dirname, "..");

class Env {
  constructor() {
    this.stage = STAGE;
  }

  get isDevelopment() {
    return this.stage === "development";
  }

  get isTest() {
    return this.stage === "test";
  }

  get isStaging() {
    return this.stage === "staging";
  }

  get isProduction() {
    return this.stage === "prod";
  }

  get isStagingOrProd() {
    return this.isProduction || this.isStaging;
  }

  log(message) {
    console.log(message);
  }

  projectPath(filePath) {
    return path.join(PROJECT_BASE_PATH, filePath);
  }
}

export default new Env();
