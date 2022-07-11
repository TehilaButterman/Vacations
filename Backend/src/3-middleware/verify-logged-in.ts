import { NextFunction, Request, Response } from "express";
import cyber from '../2-utils/cyber'

async function isLoggedIn(request: Request, response: Response, next: NextFunction) {
    
    try {
        await cyber.verifyToken(request);
        next()
    }
    catch (err: any) {
        next(err)
    }

}

export default { isLoggedIn }