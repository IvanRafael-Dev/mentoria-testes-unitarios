import { Request, Response, NextFunction } from 'express';
import { Validation } from '../../../services/validation/protocols/validation';
import { AddAccount } from '../../../domain/useCases/addAccount';

export default class SignUpController {
  private readonly _validateUserFields: Validation;
  private readonly _addAccount: AddAccount;
  constructor (validateUserFields: Validation, addAccount: AddAccount) {
    this._validateUserFields = validateUserFields;
    this._addAccount = addAccount;
  }

  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this._validateUserFields.validate(req.body);
      await this._addAccount.register(req.body);
    } catch (error) {
      next(error);
    }
  }
}
