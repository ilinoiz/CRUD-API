import { v4 as uuid } from "uuid";
class UsersRepository {
  constructor() {
    this.usersDb = [
      {
        username: "Alen",
        age: "27",
        hobbies: ["painting"],
        id: "6f033bb9-7f60-4267-9ff6-c5c0c199dc48",
      },
    ];
  }

  getAll = () => this.usersDb;

  getById = (id) => this.usersDb.find((user) => user.id === id);

  create = (userDto) => {
    const id = uuid();
    const createdUser = { ...userDto, id };
    this.usersDb.push(createdUser);
    return createdUser;
  };

  update = (id, userDto) => {
    const index = this.usersDb.findIndex((user) => user.id === id);
    if (!index) {
      return false;
    }
    this.usersDb[index] = userDto;
    return true;
  };

  delete = (id) => {
    const index = this.usersDb.findIndex((user) => user.id === id);
    if (index > -1) {
      this.usersDb = [
        ...this.usersDb.slice(0, index),
        ...this.usersDb.slice(index),
      ];
      return true;
    } else {
      return false;
    }
  };
}

const usersRepository = new UsersRepository();
export default usersRepository;
