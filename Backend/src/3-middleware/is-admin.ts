import cyber from '../2-utils/cyber'
import { Request, Response, NextFunction } from 'express'
import { UnAuthorizedError } from "../4-models/error-model";


async function isAdmin(request: Request, response: Response, next: NextFunction) {

    try {
        // decode user details from token:
        const user = await cyber.decodeUserObject(request);

        if (user.role === "Admin") {  // --> user is admin:

            next()
        }
        else {  // --> user is not admin:

            throw new UnAuthorizedError("You are not admin")
        }
    }
    catch (err: any) {
        next(err)
    }
};


export default { isAdmin };