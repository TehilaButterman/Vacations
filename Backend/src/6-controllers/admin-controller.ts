import express from "express";
import { Request, Response, NextFunction } from 'express'
import VacationModel from "../4-models/vacation-model";
import { addNewVacation, liveReport, deleteVacation, updateVacation } from '../5-logic/admin-abilities'

const router = express.Router();


router.post('/admin-page/add-vacation', async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.image = request.files?.image;

        // set vacation details according to vacation model:
        const newVacation = new VacationModel(request.body);

        // add vacation to DB:
        const added = await addNewVacation(newVacation);

        // return added vacation:
        response.status(201).json(added);

    }
    catch (err: any) {

        next(err)

    }

});
router.get('/admin-page/live-reports', async (request: Request, response: Response, next: NextFunction) => {
    try {

        // fetch live reports data:
        const reports = await liveReport();

        response.status(200).json(reports)
    }
    catch (err: any) {

        next(err)

    }
})
router.delete('/admin-page/:idToDelete', async (request: Request, response: Response, next: NextFunction) => {
    try {

        // get vacationId from request:
        const vacationId = +request.params.idToDelete;

        // delete vacation from DB:
        await deleteVacation(vacationId);

        response.status(204).send('Vacation deleted successfully!')
    }
    catch (err: any) {

        next(err)

    }
})

router.put('/admin-page', async (request: Request, response: Response, next: NextFunction) => {
    try {

        // update vacation:
        request.body.image = request.files?.image;
        const vacationToUpdate = new VacationModel(request.body)

        const updated = await updateVacation(vacationToUpdate);

        response.status(200).json(updated);

    }
    catch (err: any) {

        next(err)

    }
})
export default router;