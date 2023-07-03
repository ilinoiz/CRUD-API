import usersRepository from "../UsersRepository";
import { validate } from "uuid";
import { RequestParams } from "../models/RequestParams";
import { IncomingMessage, ServerResponse } from "http";
import { BaseHandler } from "./BaseHandler";
import { ValidationError } from "../errors/ValidationError";
import { NotFoundError } from "../errors/NotFoundError";
import { RESPONSE_CODE } from "../utils/constants";

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
      throw new ValidationError("Incorrect format for user id");
    }

    const deleteResult = usersRepository.delete(this.params.id);
    if (!deleteResult) {
      throw new NotFoundError("User not found");
    }
    this.response.statusCode = RESPONSE_CODE.NO_CONTENT;
    this.response.end();
  };
}
export default DeleteUsersHandler;
