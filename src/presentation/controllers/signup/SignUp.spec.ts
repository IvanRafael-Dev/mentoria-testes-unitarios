import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import SignUpController from './SignUp';
import MissingParamError from '../../../errors/missing-param-error';
import { makeReqRes } from '../../../test/utils/makeReqRes';

chai.use(chaiAsPromised);

const makeSut = (): SignUpController => {
  return new SignUpController();
};

describe('SignUpController', () => {
  it('should throw MissingParamError if no username is provided', async () => {
    const sut = makeSut();
    const { req, res, next } = makeReqRes();

    return await expect(sut.create(req, res, next))
      .to.rejectedWith(MissingParamError, 'Missing param: username');
  });

  it('should throw MissingParamError if no email is provided', async () => {
    const sut = makeSut();
    const { req, res, next } = makeReqRes({
      username: 'any_username'
    });

    return await expect(sut.create(req, res, next))
      .to.rejectedWith(MissingParamError, 'Missing param: email');
  });

  it('should throw MissingParamError if no password is provided', async () => {
    const sut = makeSut();
    const { req, res, next } = makeReqRes({
      username: 'any_username',
      email: 'any_email@mail.com'
    });

    return await expect(sut.create(req, res, next))
      .to.rejectedWith(MissingParamError, 'Missing param: password');
  });
});
