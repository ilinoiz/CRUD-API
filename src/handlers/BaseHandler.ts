import { IncomingMessage, ServerResponse } from "http";

export abstract class BaseHandler {
  protected request: IncomingMessage;
  protected response: ServerResponse;
  constructor(request: IncomingMessage, response: ServerResponse) {
    this.request = request;
    this.response = response;
  }
  abstract handle(): Promise<void> | void;
}
