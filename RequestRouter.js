import CreateUsersHandler from "./handlers/CreateUserHandler.js";
import DeleteUsersHandler from "./handlers/DeleteUsersHandler.js";
import GetAllUsersHandler from "./handlers/GetAllUsersHandler.js";
import GetUserByIdHandler from "./handlers/GetUserByIdHandler.js";
import NotFoundHandler from "./handlers/NotFoundHandler.js";
import UpdateUsersHandler from "./handlers/UpdateUsersHandler.js";

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
    const params = { id: match?.groups?.id };

    if (request.method === "GET" && params.id) {
      return new GetUserByIdHandler(request, response, params);
    }

    if (request.method === "PUT" && params.id) {
      return new UpdateUsersHandler(request, response, params);
    }

    if (request.method === "DELETE" && params.id) {
      return new DeleteUsersHandler(request, response, params);
    }

    return new NotFoundHandler(request, response);
  };
}
export default RequestRouter;
