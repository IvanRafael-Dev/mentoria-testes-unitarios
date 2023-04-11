import { Request, Response, NextFunction } from 'express';
import { Validation } from '../../../services/validation/protocols/validation';

export default class SignUpController {
  private readonly _validateUserFields: Validation;
  constructor (validateUserFields: Validation) {
    this._validateUserFields = validateUserFields;
  }

  create (req: Request, res: Response, next: NextFunction): void {
    this._validateUserFields.validate(req.body);
  }
}
