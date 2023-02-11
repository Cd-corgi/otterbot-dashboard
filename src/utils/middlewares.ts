import { Request, Response, NextFunction } from 'express'

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => req.user ? next() : res.status(403).send({ msg: 'Unauthorized' })