const conceptsParameters = {
  type: "object",
  properties: {
    concepts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subject: {
            type: "string",
            description:
              "Few words summarizing the customer's need for this concept.",
          },
          concept: {
            type: "string",
            description: "Brief idea of the concept. Single sentence.",
          },
          thinking: {
            type: "string",
            description: "Your detailed thinking thinking behind the concept.",
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
  },
  required: ["concepts"],
};

export { conceptsParameters };
