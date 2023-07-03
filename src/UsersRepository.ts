import { v4 as uuid } from "uuid";
import { UserDTO } from "./models/UserDTO";

class UsersRepository {
  usersDb: UserDTO[];

  constructor() {
    this.usersDb = [
    ];
  }

  getAll = () => this.usersDb;

  getById = (id: string): UserDTO | null => {
    return this.usersDb.find((user) => user.id === id) || null;
  };

  create = (userDto: UserDTO) => {
    const id = uuid();
    const createdUser = { ...userDto, id };
    this.usersDb.push(createdUser);
    return createdUser;
  };

  update = (id: string, userDto: UserDTO) => {
    const index = this.usersDb.findIndex((user) => user.id === id);
    if (index < 0) {
      return false;
    }
    this.usersDb[index] = userDto;
    return true;
  };

  delete = (id: string) => {
    const index = this.usersDb.findIndex((user) => user.id === id);
    if (index > -1) {
      this.usersDb = this.usersDb.filter((user) => user.id !== id);
      return true;
    } else {
      return false;
    }
  };
}

const usersRepository = new UsersRepository();
export default usersRepository;
