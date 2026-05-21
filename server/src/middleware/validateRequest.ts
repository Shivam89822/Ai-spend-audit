// Request validation middleware
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // Validation logic
  next();
};

export default validateRequest;
