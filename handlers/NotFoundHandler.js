class NotFoundHandler {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  handle = () => {
    this.response.statusCode = 404;
    this.response.end("Route Not found");
  };
}
export default NotFoundHandler;
