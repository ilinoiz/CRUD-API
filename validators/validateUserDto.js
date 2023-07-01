export const validateUserDto = (userDto) => {
  const errors = [];
  const requiredFields = ["username", "age", "hobbies"];
  for (const field of requiredFields) {
    if (!userDto[field]) {
      errors.push(`${field} is empty`);
    }
  }
  return errors;
};
