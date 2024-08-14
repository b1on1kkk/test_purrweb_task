import { roles } from '@prisma/client';

export interface JwtStrategyPayload {
  id: number;
  role: roles;
  iat: number;
  exp: number;
}
