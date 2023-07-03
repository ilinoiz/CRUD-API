import usersRepository from "../UsersRepository";
import { getRequestJsonBody } from "../utils/getRequestBody";
import { validate } from "uuid";
import { validateUserDto } from "../validators/validateUserDto";
import { IncomingMessage, ServerResponse } from "http";
import { RequestParams } from "../models/RequestParams";
import { BaseHandler } from "./BaseHandler";
import { NotFoundError } from "../errors/NotFoundError";
import { ValidationError } from "../errors/ValidationError";
import { RESPONSE_CODE } from "../utils/constants";

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
      throw new ValidationError("Incorrect format for user id");
    }

    const userDto = await getRequestJsonBody(this.request);
    const validationResult = validateUserDto(userDto);
    if (validationResult.length) {
      throw new ValidationError("User not valid", validationResult);
    }

    const updateResult = usersRepository.update(this.params.id, userDto);
    if (!updateResult) {
      throw new NotFoundError("User not found");
    }
    this.response.statusCode = RESPONSE_CODE.OK;
    this.response.end(JSON.stringify(userDto));
  };
}
export default UpdateUsersHandler;
