import { Request, Response, NextFunction } from 'express';
import MissingParamError from '../../../errors/missing-param-error';

export default class SignUpController {
  async create (req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    if (!req.body.username) {
      throw new MissingParamError('Missing param: username');
    }

    if (!req.body.email) {
      throw new MissingParamError('Missing param: email');
    }

    if (!req.body.password) {
      throw new MissingParamError('Missing param: password');
    }
  }
}
