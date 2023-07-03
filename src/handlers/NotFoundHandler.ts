import { IncomingMessage, ServerResponse } from "http";
import { BaseHandler } from "./BaseHandler";
import { NotFoundError } from "../errors/NotFoundError";

class NotFoundHandler extends BaseHandler {
  constructor(request: IncomingMessage, response: ServerResponse) {
    super(request, response);
  }

  handle = () => {
    throw new NotFoundError("Route not found");
  };
}
export default NotFoundHandler;
