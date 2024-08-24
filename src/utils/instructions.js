const fs = require("fs");
const env = require("../env.js");

const readInstructions = (fileName) => {
  const filePath = env.projectPath(`src/instructions/${fileName}`);
  const template = fs.readFileSync(filePath, "utf-8");
  return template;
};

module.exports = { readInstructions };
