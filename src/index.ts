import * as http from "http";
import RequestRouter from "./RequestRouter";
import "dotenv/config";
import { ErrorResponseDTO } from "./models/ErrorResponseDTO";
import { RESPONSE_CODE } from "./utils/constants";

const requestRouter = new RequestRouter();
const server = http.createServer();

const PORT = +process.env.PORT || 3000;

server.on("request", async (request, response) => {
  response.setHeader("Content-Type", "application/json");
  try {
    const handler = requestRouter.getHandler(request, response);
    await handler.handle();
  } catch (e) {
    const errorResponse: ErrorResponseDTO = {};
    if (e.name === "ValidationError") {
      errorResponse.code = RESPONSE_CODE.BAD_REQUEST;
      response.statusCode = RESPONSE_CODE.BAD_REQUEST;
      errorResponse.errors = e.errors;
    } else if (e.name === "NotFoundError") {
      errorResponse.code = RESPONSE_CODE.NOT_FOUND;
      response.statusCode = RESPONSE_CODE.NOT_FOUND;
    } else {
      errorResponse.code = RESPONSE_CODE.INTERNAL_SERVER_ERROR;
      response.statusCode = RESPONSE_CODE.INTERNAL_SERVER_ERROR;
    }
    errorResponse.message = e.message;
    response.end(JSON.stringify(errorResponse));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
