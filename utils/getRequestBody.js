export const getRequestJsonBody = (request) => {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      const jsonBody = JSON.parse(body);
      resolve(jsonBody);
    });
    request.on("error", (e) => {
      reject(e);
    });
  });
};
