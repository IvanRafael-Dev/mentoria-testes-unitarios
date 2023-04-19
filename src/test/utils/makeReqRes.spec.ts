import { expect } from 'chai';
import MakeSinonReqRes, { ReqResNext } from './makeReqRes';

const makeSut = (body: any, params: string): ReqResNext => {
  return new MakeSinonReqRes(body, params).makeReqRes();
};

describe('MakeSinonReqRes', () => {
  it('should return an object with req, res and next', () => {
    const body = { any: 'body' };
    const params = 'any_param';
    const result = makeSut(body, params);
    expect(result).to.have.all.keys('req', 'res', 'next');
  });
});
