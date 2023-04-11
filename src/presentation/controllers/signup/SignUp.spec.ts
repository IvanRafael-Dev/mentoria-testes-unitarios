import { Request, Response, NextFunction } from 'express';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import SignUpController from './SignUp';
import MissingParamError from '../../../errors/missing-param-error';

chai.use(chaiAsPromised);

interface ReqResNext {
  req: Request
  res: Response
  next: NextFunction
}

const makeReqRes = (body: any = {}, params?: string): ReqResNext => {
  const req = { body, params } as unknown as Request;
  const res = {} as Response;
  const next: NextFunction = () => {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();
  return { req, res, next };
};

const makeSut = (): SignUpController => {
  return new SignUpController();
};

describe('SignUpController', () => {
  it('should return 400 if no username is provided', async () => {
    const sut = makeSut();
    const { req, res, next } = makeReqRes();
    return await expect(sut.create(req, res, next))
      .to.rejectedWith(MissingParamError, 'Missing param: username');
  });

  it('should return 400 if no email is provided', async () => {
    const sut = makeSut();
    const { req, res, next } = makeReqRes({
      username: 'any_username'
    });
    return await expect(sut.create(req, res, next))
      .to.rejectedWith(MissingParamError, 'Missing param: email');
  });
});
