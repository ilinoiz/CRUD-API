import usersRepository from "../UsersRepository.js";
import { getRequestJsonBody } from "../utils/getRequestBody.js";

class UpdateUsersHandler {
  constructor(request, response, params) {
    this.request = request;
    this.response = response;
    this.params = params;
  }

  handle = async () => {
    const userDto = await getRequestJsonBody(this.request);
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
