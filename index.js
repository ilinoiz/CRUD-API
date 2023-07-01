import http from "http";
import RequestRouter from "./RequestRouter.js";

const PORT = 3000;

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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
