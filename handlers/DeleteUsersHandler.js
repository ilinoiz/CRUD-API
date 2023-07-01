import usersRepository from "../UsersRepository.js";

class DeleteUsersHandler {
  constructor(request, response, params) {
    this.request = request;
    this.response = response;
    this.params = params;
  }

  handle = async () => {
    const deleteResult = usersRepository.delete(this.params.id);
    if(!deleteResult){
        this.response.statusCode = 404; 
        this.response.end('User not found');
    }
    this.response.statusCode = 204;
    this.response.end();
  };
}
export default DeleteUsersHandler;
