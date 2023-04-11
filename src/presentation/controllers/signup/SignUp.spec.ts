import chai, { expect } from 'chai';
import sinon from 'sinon';
import SignUpController from './SignUp';
import MakeSinonReqRes, { ReqResNext } from '../../../test/utils/makeReqRes';
import { Validation } from '../../../services/validation/protocols/validation';

interface User {
  id?: number
  username: string
  email: string
  password: string
}

interface SutTypes {
  sut: SignUpController
  validateUserFieldsStub: Validation
}

const makeRequestObject = (body: any, params: string): ReqResNext => {
  return new MakeSinonReqRes(body, params).makeReqRes();
};

const makeSut = (): SutTypes => {
  class ValidateUserFieldsStub implements Validation {
    validate (user: User): void {}
  }
  const validateUserFieldsStub = new ValidateUserFieldsStub();
  const sut = new SignUpController(validateUserFieldsStub);

  return {
    sut,
    validateUserFieldsStub
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
    sut.create(req, res, next);
    expect(validateSpy.calledWith(req.body)).to.be.true;
  });
});
