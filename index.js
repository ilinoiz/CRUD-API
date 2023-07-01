import http from "http";
import RequestRouter from "./RequestRouter.js";

const PORT = 3000;

const requestRouter = new RequestRouter();
const server = http.createServer();

server.on("request", async (request, response) => {
  response.setHeader("Content-Type", "application/json");
  const handler = requestRouter.getHandler(request, response);
  await handler.handle();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
