import fs from "fs";
import env from "../env.js";

const readInstructions = (fileName) => {
  const filePath = env.projectPath(`src/instructions/${fileName}`);
  const template = fs.readFileSync(filePath, "utf-8");
  return template;
};

export { readInstructions };
