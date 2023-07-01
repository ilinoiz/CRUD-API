import { IncomingMessage, ServerResponse } from "http";
import { BaseHandler } from "./BaseHandler";

class NotFoundHandler extends BaseHandler {
  constructor(request: IncomingMessage, response: ServerResponse) {
    super(request, response);
  }

  handle = () => {
    this.response.statusCode = 404;
    this.response.end("Route Not found");
  };
}
export default NotFoundHandler;
