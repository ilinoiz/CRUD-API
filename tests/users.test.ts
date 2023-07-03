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
  it("Scenario 1", async () => {
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
});
