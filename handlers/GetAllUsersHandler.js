import usersRepository from "../UsersRepository.js";

class GetAllUsersHandler {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  handle = () => {
    const allUsers = usersRepository.getAll();
    this.response.statusCode = 200;
    this.response.end(JSON.stringify(allUsers));
  };
}
export default GetAllUsersHandler;
