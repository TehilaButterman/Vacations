import express from 'express'
import { Request, Response, NextFunction } from 'express'
import vacationLogic from '../5-logic/vacation-logic';
import cyber from '../2-utils/cyber';
import { RouteNotFound } from '../4-models/error-model';
import path from 'path'
import fs from 'fs'
import FollowModel from '../4-models/follow-model';
import verifyLoggedIn from '../3-middleware/verify-logged-in';
import pass from '../5-logic/auth-logic'

const router = express.Router();

router.get("/vacations", verifyLoggedIn.isLoggedIn, async (request: Request, response: Response,
    next: NextFunction) => {

    try {

        // decode user details from request.headers
        const user = cyber.decodeUserObject(request)
        const userId = user.userId;

        // fetch vacations according to user id:
        const vacations = await vacationLogic.fetchAllVacations(userId);

        response.status(200).json(vacations);

    } catch (err) {

        next(err);

    }

});

router.post('/vacations', verifyLoggedIn.isLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {

        // follow vacation:
        const follow = new FollowModel(request.body);
        await vacationLogic.followVacation(follow);

        response.status(200)
    }
    catch (err: any) {

        next(err);
    }

})

router.delete('/vacations', verifyLoggedIn.isLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // set vacation details according to follow model:
        const vacationToDelete = new FollowModel(request.body);

        // follow vacation in DB:
        await vacationLogic.unFollowVacation(vacationToDelete);

        response.status(204)
    }
    catch (err: any) {
        next(err)
    }
})
router.get('/vacations/:userId', verifyLoggedIn.isLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // get userId from request:
        const id = +request.params.userId;

        // fetch vacations for user:
        const getVacations = await vacationLogic.fetchAllVacations(id);

        response.status(200).json(getVacations)
    }
    catch (err: any) {
        next(err)
    }
});


router.get('/vacations/image/:imageName', async (request: Request, response: Response, next: NextFunction) => {

    try {

        // return image from local file, according to the unique imageName:
        const imageName = request.params.imageName;

        const absolutePath = path.join(__dirname, '..', '1-assets', 'vacation_images', imageName);

        // image doesn't exists in file / imageName is incorrect:
        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFound(request.method, request.originalUrl)
        }

        else {
            // send image to user:
            response.sendFile(absolutePath)
        }

    } catch (err: any) {

        next(err)

    }
})

router.get('/password/:password', async (request: Request, response: Response, next: NextFunction) => {
    try {

        const password = request.params.password;
        await pass.pass(password);
        response.send('success').status(201)
    } catch (err) {

    }
})
export default router;