import { IncomingMessage, ServerResponse } from "http";
import usersRepository from "../UsersRepository";
import { BaseHandler } from "./BaseHandler";

class GetAllUsersHandler extends BaseHandler {
  constructor(request: IncomingMessage, response: ServerResponse) {
    super(request, response);
  }

  handle = () => {
    const allUsers = usersRepository.getAll();
    this.response.statusCode = 200;
    this.response.end(JSON.stringify(allUsers));
  };
}
export default GetAllUsersHandler;
