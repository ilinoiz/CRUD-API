import usersRepository from "../UsersRepository.js";

class CreateUsersHandler {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  handle = () => {
    let body = "";
    this.request.on("data", (chunk) => {
      body += chunk.toString();
    });
    this.request.on("end", () => {
      const userDto = JSON.parse(body);
      const createdUser = usersRepository.create(userDto);
      this.response.statusCode = 201;
      this.response.end(JSON.stringify(createdUser));
    });
  };
}
export default CreateUsersHandler;
