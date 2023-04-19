import { Request, Response, NextFunction } from 'express';
import sinon from 'sinon';

export interface ReqResNext {
  req: Request
  res: Response
  next: NextFunction
}

export default class MakeSinonReqRes {
  private readonly body: any;
  private readonly params: string;

  constructor (body: any, params: string) {
    this.body = body;
    this.params = params;
  }

  public makeReqRes (): ReqResNext {
    const req = { body: this.body, params: this.params } as unknown as Request;
    const res = {} as Response;
    const next = sinon.spy() as NextFunction;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();
    return { req, res, next };
  }
}
