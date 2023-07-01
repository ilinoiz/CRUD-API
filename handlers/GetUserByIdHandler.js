import usersRepository from "../UsersRepository.js";

class GetUserByIdHandler {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  handle = () => {
    const regex = /api\/users\/(?<id>[\w-]+)/;
    const match = regex.exec(this.request.url);

    const user = usersRepository.getById(match.groups.id);
    if (user) {
      this.response.statusCode = 200;
      this.response.end(JSON.stringify(user));
    } else {
      this.response.statusCode = 404;
      this.response.end("User not found");
    }
  };
}
export default GetUserByIdHandler;
