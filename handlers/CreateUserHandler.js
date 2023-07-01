import usersRepository from "../UsersRepository.js";
import { validateUserDto } from "../validators/validateUserDto.js";
import { getRequestJsonBody } from "../utils/getRequestBody.js";

class CreateUsersHandler {
  constructor(request, response) {
    this.request = request;
    this.response = response;
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
