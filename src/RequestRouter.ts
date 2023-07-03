import { IncomingMessage, ServerResponse } from "http";
import CreateUsersHandler from "./handlers/CreateUserHandler";
import DeleteUsersHandler from "./handlers/DeleteUsersHandler";
import GetAllUsersHandler from "./handlers/GetAllUsersHandler";
import GetUserByIdHandler from "./handlers/GetUserByIdHandler";
import NotFoundHandler from "./handlers/NotFoundHandler";
import UpdateUsersHandler from "./handlers/UpdateUsersHandler";
import { REQUEST_METHOD } from "./utils/constants";

class RequestRouter {
  usersEndpoint = "/api/users";

  getHandler = (request: IncomingMessage, response: ServerResponse) => {
    if (request.url === this.usersEndpoint) {
      if (request.method === REQUEST_METHOD.GET) {
        return new GetAllUsersHandler(request, response);
      }
      if (request.method === REQUEST_METHOD.POST) {
        return new CreateUsersHandler(request, response);
      }
    }

    const regex = /api\/users\/(?<id>[\w-]+)/;
    const match = regex.exec(request.url);
    const params = { id: match?.groups?.id };

    if (request.method === REQUEST_METHOD.GET && params.id) {
      return new GetUserByIdHandler(request, response, params);
    }

    if (request.method === REQUEST_METHOD.PUT && params.id) {
      return new UpdateUsersHandler(request, response, params);
    }

    if (request.method === REQUEST_METHOD.DELETE && params.id) {
      return new DeleteUsersHandler(request, response, params);
    }

    return new NotFoundHandler(request, response);
  };
}
export default RequestRouter;
