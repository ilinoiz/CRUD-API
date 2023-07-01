import { IncomingMessage, ServerResponse } from "http";
import usersRepository from "../UsersRepository";
import { validate } from "uuid";
import { RequestParams } from "../models/RequestParams";

class GetUserByIdHandler {
  request: IncomingMessage;
  response: ServerResponse;
  params: RequestParams;
  constructor(request: IncomingMessage, response: ServerResponse, params: RequestParams) {
    this.request = request;
    this.response = response;
    this.params = params;
  }

  handle = () => {
    const isUUID = validate(this.params.id);
    if (!isUUID) {
      this.response.statusCode = 400;
      this.response.end("Bad Request: Incorrect format for user id");
      return;
    }
    const user = usersRepository.getById(this.params.id);
    if (user) {
      this.response.statusCode = 200;
      this.response.end(JSON.stringify(user));
      return;
    }
    this.response.statusCode = 404;
    this.response.end("User not found");
  };
}
export default GetUserByIdHandler;
