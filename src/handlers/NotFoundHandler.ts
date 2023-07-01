import { IncomingMessage, ServerResponse } from "http";

class NotFoundHandler {
  request: IncomingMessage;
  response: ServerResponse;
  constructor(request: IncomingMessage, response: ServerResponse) {
    this.request = request;
    this.response = response;
  }

  handle = () => {
    this.response.statusCode = 404;
    this.response.end("Route Not found");
  };
}
export default NotFoundHandler;
