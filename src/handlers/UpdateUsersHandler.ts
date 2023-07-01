import usersRepository from "../UsersRepository";
import { getRequestJsonBody } from "../utils/getRequestBody";
import { validate } from "uuid";
import { validateUserDto } from "../validators/validateUserDto";
import { IncomingMessage, ServerResponse } from "http";
import { RequestParams } from "../models/RequestParams";
import { BaseHandler } from "./BaseHandler";

class UpdateUsersHandler extends BaseHandler {
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

    const userDto = await getRequestJsonBody(this.request);
    const validationResult = validateUserDto(userDto);
    if (validationResult.length) {
      this.response.statusCode = 400;
      this.response.end(JSON.stringify(validationResult));
      return;
    }

    const updateResult = usersRepository.update(this.params.id, userDto);
    if (updateResult) {
      this.response.statusCode = 200;
      this.response.end();
    } else {
      this.response.statusCode = 404;
      this.response.end("User not found");
    }
  };
}
export default UpdateUsersHandler;
