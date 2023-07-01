import http from "http";
import RequestRouter from "./RequestRouter.js";
import "dotenv/config";

const requestRouter = new RequestRouter();
const server = http.createServer();

server.on("request", async (request, response) => {
  response.setHeader("Content-Type", "application/json");
  try {
    const handler = requestRouter.getHandler(request, response);
    await handler.handle();
  } catch (error) {
    response.statusCode = 500;
    console.log(error);
    response.end("Internal server error");
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
