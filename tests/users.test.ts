import * as request from "supertest";
import { RESPONSE_CODE } from "../src/utils/constants";

const app = request("http://localhost:3000");
const endpoint = "/api/users";
const mockedUser = {
  username: "Alen",
  age: 27,
  hobbies: ["painting"],
};

describe("Users api", () => {
  it("Scenario 1 happy path (mentioned in task)", async () => {
    const getAllUsersResponse = await app.get(endpoint);
    expect(getAllUsersResponse.status).toEqual(RESPONSE_CODE.OK);
    expect(getAllUsersResponse.body).toEqual([]);

    const createUserResponse = await app
      .post(endpoint)
      .send(mockedUser)
      .set("Content-Type", "application/json");
    expect(createUserResponse.status).toEqual(RESPONSE_CODE.CREATED);
    expect(createUserResponse.body.username).toEqual(mockedUser.username);
    expect(createUserResponse.body.id).toBeTruthy();

    const getUserByIdResponse = await app.get(
      `${endpoint}/${createUserResponse.body.id}`
    );
    expect(getUserByIdResponse.status).toEqual(RESPONSE_CODE.OK);
    expect(getUserByIdResponse.body).toEqual(createUserResponse.body);
    expect(getUserByIdResponse.body.id).toEqual(createUserResponse.body.id);

    const updateUserResponse = await app
      .put(`${endpoint}/${createUserResponse.body.id}`)
      .send({ ...createUserResponse.body, username: "Olya" })
      .set("Content-Type", "application/json");
    expect(updateUserResponse.status).toEqual(RESPONSE_CODE.OK);
    expect(updateUserResponse.body).toEqual({
      ...createUserResponse.body,
      username: "Olya",
    });

    const deleteUserResponse = await app.delete(
      `${endpoint}/${createUserResponse.body.id}`
    );
    expect(deleteUserResponse.status).toEqual(RESPONSE_CODE.NO_CONTENT);

    const getNotExistedUserResponse = await app.get(
      `${endpoint}/${createUserResponse.body.id}`
    );
    expect(getNotExistedUserResponse.status).toEqual(RESPONSE_CODE.NOT_FOUND);
  });

  it("Scenario 2, user validation check", async () => {
    const getAllUsersResponse = await app.get(endpoint);
    expect(getAllUsersResponse.status).toEqual(RESPONSE_CODE.OK);
    expect(getAllUsersResponse.body).toEqual([]);

    const createUserResponseInvalid = await app
      .post(endpoint)
      .send({ ...mockedUser, username: null })
      .set("Content-Type", "application/json");
    expect(createUserResponseInvalid.status).toEqual(RESPONSE_CODE.BAD_REQUEST);
    expect(createUserResponseInvalid.body.message).toEqual("User not valid");
    expect(createUserResponseInvalid.body.errors).toEqual([
      "username is empty",
    ]);

    const createUserResponseValid = await app
      .post(endpoint)
      .send(mockedUser)
      .set("Content-Type", "application/json");
    expect(createUserResponseValid.status).toEqual(RESPONSE_CODE.CREATED);
    expect(createUserResponseValid.body.username).toEqual(mockedUser.username);
    expect(createUserResponseValid.body.id).toBeTruthy();

    const updateUserResponse = await app
      .put(`${endpoint}/${createUserResponseValid.body.id}`)
      .send({})
      .set("Content-Type", "application/json");
    expect(updateUserResponse.status).toEqual(RESPONSE_CODE.BAD_REQUEST);
    expect(updateUserResponse.body.message).toEqual("User not valid");
    expect(updateUserResponse.body.errors).toEqual([
      "username is empty",
      "age is empty",
      "hobbies is empty",
    ]);

    const deleteUserResponse = await app.delete(
      `${endpoint}/${createUserResponseValid.body.id}`
    );
    expect(deleteUserResponse.status).toEqual(RESPONSE_CODE.NO_CONTENT);
  });

  it("Scenario 3: userId UUID format", async () => {
    const getUserByIdResponse = await app.get(`${endpoint}/123`);
    expect(getUserByIdResponse.status).toEqual(RESPONSE_CODE.BAD_REQUEST);
    expect(getUserByIdResponse.body.message).toEqual(
      "Incorrect format for user id"
    );

    const updateUserResponse = await app
      .put(`${endpoint}/123`)
      .send(mockedUser)
      .set("Content-Type", "application/json");
    expect(updateUserResponse.status).toEqual(RESPONSE_CODE.BAD_REQUEST);
    expect(updateUserResponse.body.message).toEqual(
      "Incorrect format for user id"
    );

    const deleteUserResponse = await app.delete(`${endpoint}/123`);
    expect(deleteUserResponse.status).toEqual(RESPONSE_CODE.BAD_REQUEST);
    expect(deleteUserResponse.body.message).toEqual(
      "Incorrect format for user id"
    );
  });

  it("Scenario 4: routing", async () => {
    const getAllUsersResponseValid = await app.get(`${endpoint}/`);
    expect(getAllUsersResponseValid.status).toEqual(RESPONSE_CODE.OK);
    expect(getAllUsersResponseValid.body).toEqual([]);

    const getAllUsersResponseInvalid = await app.get("/movies/");
    expect(getAllUsersResponseInvalid.status).toEqual(RESPONSE_CODE.NOT_FOUND);
    expect(getAllUsersResponseInvalid.body.message).toEqual("Route not found");
  });
});
