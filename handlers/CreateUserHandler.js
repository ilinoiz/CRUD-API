import usersRepository from "../UsersRepository.js";

class CreateUsersHandler {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  handle = async () => {
    const userDto = await getRequestJsonBody(this.request);
    const createdUser = usersRepository.create(userDto);
    this.response.statusCode = 201;
    this.response.end(JSON.stringify(createdUser));
  };
}
export default CreateUsersHandler;
