import { Request } from 'express';

import { JwtStrategyPayload } from './payload_strategy.interface';

export interface ExtendedRequest extends Request {
  user: JwtStrategyPayload;
}
