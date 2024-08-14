import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, HttpException } from '@nestjs/common';

import { JWTAuthGuard } from '../jwt.guard';

import { mockTestAdminToken } from 'test/constants/mock-token.constant';

describe('JWTAuthGuard', () => {
  let guard: JWTAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JWTAuthGuard],
    }).compile();

    guard = module.get<JWTAuthGuard>(JWTAuthGuard);
  });

  it('should return true if token is valid', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${mockTestAdminToken}`,
          },
        }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return throw error if token is invalid', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${mockTestAdminToken + '123'}`,
          },
        }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(HttpException);
  });
});
