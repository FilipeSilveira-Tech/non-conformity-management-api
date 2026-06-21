import type { NextFunction, Request, Response } from 'express';

export type ReqRes = {
    req: Request,
    res: Response,
    next: NextFunction
}