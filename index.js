import http from "http";
import RequestRouter from "./RequestRouter.js";

const PORT = 3000;

const requestRouter = new RequestRouter();

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");
  const handler = requestRouter.getHandler(request, response);
  handler.handle();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
