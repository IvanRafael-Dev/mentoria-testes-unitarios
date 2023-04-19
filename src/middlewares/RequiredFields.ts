import { NextFunction, Request, Response } from 'express';
import MissingParamError from '../errors/missing-param-error';

export interface RequiredFieldsOptions {
  user: string[]
  login: string[]
}

export default class RequiredFields {
  private readonly requiredFields: RequiredFieldsOptions;

  constructor (requiredFields: RequiredFieldsOptions) {
    this.requiredFields = requiredFields;
  }

  verify (name: keyof typeof this.requiredFields) {
    return (req: Request, _res: Response, next: NextFunction) => {
      const fields = this.requiredFields[name];
      for (const field of fields) {
        if (!req.body[field]) {
          throw new MissingParamError(`Missing param: ${field}`);
        }
      }
      next();
    };
  }
}
