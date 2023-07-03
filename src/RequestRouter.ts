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
  usersIdRouteRegexp = /api\/users(\/)?(?<id>[\w-]+)?\/?$/;
  usersRouteRegexp = /api\/users(\/)?$/;

  getHandler = (request: IncomingMessage, response: ServerResponse) => {
    const userRouteMatch = this.usersRouteRegexp.exec(request.url);
    const idRouteMatch = this.usersIdRouteRegexp.exec(request.url);
    const params = { id: idRouteMatch?.groups?.id };

    if (userRouteMatch?.length && !params.id) {
      switch (request.method) {
        case REQUEST_METHOD.GET:
          return new GetAllUsersHandler(request, response);
        case REQUEST_METHOD.POST:
          return new CreateUsersHandler(request, response);
      }
    }

    if (idRouteMatch?.length && params.id) {
      switch (request.method) {
        case REQUEST_METHOD.GET:
          return new GetUserByIdHandler(request, response, params);
        case REQUEST_METHOD.PUT:
          return new UpdateUsersHandler(request, response, params);
        case REQUEST_METHOD.DELETE:
          return new DeleteUsersHandler(request, response, params);
      }
    }

    return new NotFoundHandler(request, response);
  };
}
export default RequestRouter;
