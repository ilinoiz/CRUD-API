import usersRepository from "../UsersRepository";
import { validate } from "uuid";
import { RequestParams } from "../models/RequestParams";
import { IncomingMessage, ServerResponse } from "http";
import { BaseHandler } from "./BaseHandler";

class DeleteUsersHandler extends BaseHandler {
  params: RequestParams;
  constructor(
    request: IncomingMessage,
    response: ServerResponse,
    params: RequestParams
  ) {
    super(request, response);
    this.params = params;
  }

  handle = async () => {
    const isUUID = validate(this.params.id);
    if (!isUUID) {
      this.response.statusCode = 400;
      this.response.end("Bad Request: Incorrect format for user id");
      return;
    }

    const deleteResult = usersRepository.delete(this.params.id);
    if (!deleteResult) {
      this.response.statusCode = 404;
      this.response.end("User not found");
    }
    this.response.statusCode = 204;
    this.response.end();
  };
}
export default DeleteUsersHandler;
