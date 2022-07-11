import express, { NextFunction, Request, Response } from 'express'
import CredentialsModel from '../4-models/credentials-model';
import UserModel from '../4-models/user-model';
import logic from '../5-logic/auth-logic';

const router = express.Router();

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {

    try {

        const credentials = new CredentialsModel(request.body);

        // fetch user details from DB:
        const token = await logic.login(credentials);
        response.status(201).json(token);

    } catch (err: any) {

        next(err)

    }
})

router.post('/register', async (request: Request, response: Response, next: NextFunction) => {

    try {

        const user = new UserModel(request.body);

        // fetch user details from DB:
        const result = await logic.register(user);
        response.status(201).json(result);
        
    }
    catch (err: any) {

        next(err)

    }
});

export default router;