import { expect } from 'chai';
import sinon from 'sinon';
import SignUpController from './SignUp';
import MakeSinonReqRes, { ReqResNext } from '../../../test/utils/makeReqRes';
import { Validation } from '../../../services/validation/protocols/validation';
import { User } from '../../../domain/models/User';
import { AddAccount } from '../../../domain/useCases/addAccount';
import { AccountModel } from '../../../domain/models/Account';

const makeRequestObject = (body: any, params: string): ReqResNext => {
  return new MakeSinonReqRes(body, params).makeReqRes();
};

const makeValidateUserFieldsStub = (): Validation => {
  class ValidateUserFieldsStub implements Validation {
    validate (user: User): void {}
  }
  return new ValidateUserFieldsStub();
};

interface SutTypes {
  sut: SignUpController
  validateUserFieldsStub: Validation
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  class AddAccountStub implements AddAccount {
    async register (user: User): Promise<AccountModel> {
      return { id: 1, ...user };
    }
  }
  const addAccountStub = new AddAccountStub();
  const validateUserFieldsStub = makeValidateUserFieldsStub();
  const sut = new SignUpController(validateUserFieldsStub, addAccountStub);

  return {
    sut,
    validateUserFieldsStub,
    addAccountStub
  };
};

describe('SignUpController', () => {
  it('should call Validations with correct values', async () => {
    const { sut, validateUserFieldsStub } = makeSut();
    const validateSpy = sinon.spy(validateUserFieldsStub, 'validate');
    const { req, res, next } = makeRequestObject({
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password'
    }, '');
    await sut.create(req, res, next);
    expect(validateSpy.calledWith(req.body)).to.be.true;
  });

  it('should call next if validation throws', async () => {
    const { sut, validateUserFieldsStub } = makeSut();
    const error = new Error();
    sinon.mock(validateUserFieldsStub).expects('validate').throws(error);
    const { req, res, next } = makeRequestObject({
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password'
    }, '');
    await sut.create(req, res, next);
    expect((next as sinon.SinonSpy).calledWithExactly(error)).to.be.true;
  });

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addAccountSpy = sinon.spy(addAccountStub, 'register');
    const { req, res, next } = makeRequestObject({
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password'
    }, '');
    await sut.create(req, res, next);
    expect(addAccountSpy.calledWith(req.body)).to.be.true;
  });
});
