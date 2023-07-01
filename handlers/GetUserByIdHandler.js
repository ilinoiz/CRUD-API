import usersRepository from "../UsersRepository.js";

class GetUserByIdHandler {
  constructor(request, response, params) {
    this.request = request;
    this.response = response;
    this.params = params;
  }

  handle = () => {
    const user = usersRepository.getById(this.params.id);
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
