export type RequestUser = {
  username: string
};

interface HttpRequest {
  body: any
  params?: any
  user?: RequestUser
}

interface HttpResponse {
  statusCode: number
  body: any
}

export { HttpRequest, HttpResponse };
