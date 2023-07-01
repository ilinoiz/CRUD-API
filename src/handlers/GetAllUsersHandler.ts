import { IncomingMessage, ServerResponse } from "http";
import usersRepository from "../UsersRepository";

class GetAllUsersHandler {
  request: IncomingMessage;
  response: ServerResponse;

  constructor(request: IncomingMessage, response: ServerResponse) {
    this.request = request;
    this.response = response;
  }

  handle = () => {
    const allUsers = usersRepository.getAll();
    this.response.statusCode = 200;
    this.response.end(JSON.stringify(allUsers));
  };
}
export default GetAllUsersHandler;
