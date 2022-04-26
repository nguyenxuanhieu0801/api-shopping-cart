import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shopping Cart API",
      version: "1.0.0",
      description: "A simple Express Shopping Cart API",
    },
    servers: [
      {
        url: "https://5s5s7.sse.codesandbox.io/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpecs = swaggerJsDoc(options);
