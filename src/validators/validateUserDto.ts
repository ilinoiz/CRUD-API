import { UserDTO } from "../models/UserDTO";

export const validateUserDto = (userDto: UserDTO) => {
  const errors: string[] = [];
  const requiredFields = ["username", "age", "hobbies"];
  for (const field of requiredFields) {
    if (!userDto[field]) {
      errors.push(`${field} is empty`);
    }
  }
  return errors;
};
