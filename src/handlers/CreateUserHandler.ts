import usersRepository from "../UsersRepository";
import { validateUserDto } from "../validators/validateUserDto";
import { getRequestJsonBody } from "../utils/getRequestBody";
import { IncomingMessage, ServerResponse } from "http";
import { BaseHandler } from "./BaseHandler";

class CreateUsersHandler extends BaseHandler {
  constructor(request: IncomingMessage, response: ServerResponse) {
    super(request, response);
  }

  handle = async () => {
    const userDto = await getRequestJsonBody(this.request);
    const validationResult = validateUserDto(userDto);
    if (validationResult.length) {
      this.response.statusCode = 400;
      this.response.end(JSON.stringify(validationResult));
      return;
    }
    const createdUser = usersRepository.create(userDto);
    this.response.statusCode = 201;
    this.response.end(JSON.stringify(createdUser));
  };
}
export default CreateUsersHandler;
