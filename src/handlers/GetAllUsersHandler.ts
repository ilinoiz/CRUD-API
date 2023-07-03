import { IncomingMessage, ServerResponse } from "http";
import usersRepository from "../UsersRepository";
import { BaseHandler } from "./BaseHandler";
import { RESPONSE_CODE } from "../utils/constants";

class GetAllUsersHandler extends BaseHandler {
  constructor(request: IncomingMessage, response: ServerResponse) {
    super(request, response);
  }

  handle = () => {
    const allUsers = usersRepository.getAll();
    this.response.statusCode = RESPONSE_CODE.OK;
    this.response.end(JSON.stringify(allUsers));
  };
}
export default GetAllUsersHandler;
