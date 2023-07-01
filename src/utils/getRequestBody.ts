import { IncomingMessage } from "http";
import { UserDTO } from "../models/UserDTO";

export const getRequestJsonBody = (request: IncomingMessage) => {
  return new Promise<UserDTO>((resolve, reject) => {
    let body = "";
    request.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      const jsonBody: UserDTO = JSON.parse(body);
      resolve(jsonBody);
    });
    request.on("error", (e) => {
      reject(e);
    });
  });
};
