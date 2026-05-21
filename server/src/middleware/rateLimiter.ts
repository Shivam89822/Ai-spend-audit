// Rate limiter middleware
import { Request, Response, NextFunction } from 'express';

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Rate limiting logic
  next();
};

export default rateLimiter;
