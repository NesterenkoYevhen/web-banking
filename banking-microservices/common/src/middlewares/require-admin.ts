import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { AccessDeniedError } from '../errors/access-denied';

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  if (req.currentUser.role === 'USER') {
    throw new AccessDeniedError();
  }
  next();
};
