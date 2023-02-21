import { Request, Response } from 'express';
import { Controller } from '../../../../presentation/contracts/Controller';
import { HttpRequest, HttpResponse } from '../../../../presentation/contracts/Http';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      user: request.user,
      file: request.file?.filename,
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
