import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: Record<string, any>; // Add payload type if known
  accessToken?: string;
}
