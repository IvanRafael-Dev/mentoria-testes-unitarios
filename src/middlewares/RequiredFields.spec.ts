import { expect } from 'chai';
import MissingParamError from '../errors/missing-param-error';
import RequiredFields, { RequiredFieldsOptions } from './RequiredFields';
import MakeSinonReqRes, { ReqResNext } from '../test/utils/makeReqRes';

const makeSut = (): RequiredFields => {
  const requiredFieldsOptions: RequiredFieldsOptions = {
    user: ['username', 'email', 'password'],
    login: ['email', 'password']
  };
  const requiredFields = new RequiredFields(requiredFieldsOptions);
  return requiredFields;
};

const makeReqRes = (body: any, params: string): ReqResNext => {
  return new MakeSinonReqRes(body, params).makeReqRes();
};

describe('RequiredFields', () => {
  describe('when signup required fields are not provided', () => {
    it('should throw MissingParamError if no username is provided', async () => {
      const sut = makeSut();
      const { req, res, next } = makeReqRes({
        email: 'any_email@mail.com',
        password: 'any_password'
      }, '');
      expect(() => sut.verify('user')(req, res, next)).to.throw(MissingParamError, 'Missing param: username');
    });

    it('should throw MissingParamError if no email is provided', async () => {
      const sut = makeSut();
      const { req, res, next } = makeReqRes({
        username: 'any_username',
        password: 'any_password'
      }, '');
      expect(() => sut.verify('user')(req, res, next)).to.throw(MissingParamError, 'Missing param: email');
    });

    it('should throw MissingParamError if no username is provided', async () => {
      const sut = makeSut();
      const { req, res, next } = makeReqRes({
        username: 'any_username',
        email: 'any_email@mail.com'
      }, '');
      expect(() => sut.verify('user')(req, res, next)).to.throw(MissingParamError, 'Missing param: password');
    });
  });

  describe('when signup required fields are provided', () => {
    it('should call next', async () => {
      const sut = makeSut();
      const { req, res, next } = makeReqRes({
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password'
      }, '');
      sut.verify('user')(req, res, next);
      expect((next as sinon.SinonSpy).calledOnce).to.be.true;
    });
  });
});
