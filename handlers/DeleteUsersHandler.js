import usersRepository from "../UsersRepository.js";
import { validate } from "uuid";

class DeleteUsersHandler {
  constructor(request, response, params) {
    this.request = request;
    this.response = response;
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
