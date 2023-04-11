import { Request, Response, NextFunction } from 'express';
import sinon from 'sinon';

export interface ReqResNext {
  req: Request
  res: Response
  next: NextFunction
}

export const makeReqRes = (body: any = {}, params?: string): ReqResNext => {
  const req = { body, params } as unknown as Request;
  const res = {} as Response;
  const next = sinon.spy() as NextFunction;
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();
  return { req, res, next };
};
