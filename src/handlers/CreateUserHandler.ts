import usersRepository from "../UsersRepository";
import { validateUserDto } from "../validators/validateUserDto";
import { getRequestJsonBody } from "../utils/getRequestBody";
import { IncomingMessage, ServerResponse } from "http";
import { BaseHandler } from "./BaseHandler";
import { ValidationError } from "../errors/ValidationError";
import { RESPONSE_CODE } from "../utils/constants";

class CreateUsersHandler extends BaseHandler {
  constructor(request: IncomingMessage, response: ServerResponse) {
    super(request, response);
  }

  handle = async () => {
    const userDto = await getRequestJsonBody(this.request);
    const validationResult = validateUserDto(userDto);
    if (validationResult.length) {
      throw new ValidationError("User not valid", validationResult);
    }
    const createdUser = usersRepository.create(userDto);
    this.response.statusCode = RESPONSE_CODE.CREATED;
    this.response.end(JSON.stringify(createdUser));
  };
}
export default CreateUsersHandler;
