export type RequestUser = {
  id: string;
  username: string
};

interface HttpRequest {
  body: any
  params?: any
  file: any;
  user?: RequestUser
}

interface HttpResponse {
  statusCode: number
  body: any
}

export { HttpRequest, HttpResponse };
