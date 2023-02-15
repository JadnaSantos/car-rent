import { HttpRequest, HttpResponse } from './Http';

interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

export { Controller };
