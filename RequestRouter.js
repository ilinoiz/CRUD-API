import CreateUsersHandler from "./handlers/CreateUserHandler.js";
import GetAllUsersHandler from "./handlers/GetAllUsersHandler.js";
import GetUserByIdHandler from "./handlers/GetUserByIdHandler.js";
import NotFoundHandler from "./handlers/NotFoundHandler.js";

class RequestRouter {
  usersEndpoint = "/api/users";

  getHandler = (request, response) => {
    if (request.url === this.usersEndpoint) {
      if (request.method === "GET") {
        return new GetAllUsersHandler(request, response);
      }
      if (request.method === "POST") {
        return new CreateUsersHandler(request, response);
      }
    }

    const regex = /api\/users\/(?<id>[\w-]+)/;
    const match = regex.exec(request.url);

    if (request.method === "GET" && match.groups.id) {
      return new GetUserByIdHandler(request, response);
    }

    return new NotFoundHandler(request, response);
  };
}
export default RequestRouter;
