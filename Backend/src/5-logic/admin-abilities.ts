import VacationModel from "../4-models/vacation-model";
import dal from '../2-utils/dal';
import { v4 as uuid } from 'uuid';
import socketLogic from "./socket-logic";
import { OkPacket } from "mysql";
import { UploadedFile } from "express-fileupload";
import { ValidationError } from "../4-models/error-model";

function images(image: UploadedFile): string {

    // save image to a local file and rename it to a unique name:

    const dotIndex = image.name.lastIndexOf('.');
    const originalExtension = image.name.substring(dotIndex);
    const imageName = uuid() + originalExtension;

    // save image to a local file:
    image.mv('./src/1-assets/vacation_images/' + imageName);

    // imageName to DB
    return imageName;

}

async function addNewVacation(vacation: VacationModel): Promise<VacationModel> {

    // validation (according to joi validation in the model):
    const errors = vacation.ValidatePost();

    if (errors) {

        throw new ValidationError(errors)

    }

    // set image to DB:
    if (vacation.image) {

        vacation.imageName = images(vacation.image);
        delete vacation.image;

    };

    // send required values to DB:
    const sql = `INSERT INTO vacations_details 
                      VALUES (DEFAULT, ?, ?, ? , ? ,?, ?)`;

    const addedVacation: OkPacket = await dal.execute(sql, [vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.imageName, vacation.target]);

    // add vacationId from DB (auto increment):
    vacation.vacationId = addedVacation.insertId

    // send added vacation for all users by socket:
    socketLogic.adminAddVacation(vacation);

    return vacation;

};


async function updateVacation(vacation: VacationModel): Promise<VacationModel> {


    // validation: (according to joi validation in the model)
    const errors = vacation.ValidatePut();

    if (errors) {
        throw new ValidationError(errors)
    }

    // set image to DB
    if (vacation.image) {
        vacation.imageName = images(vacation.image);
        delete vacation.image;

    };

    // send values to DB
    const sql = `UPDATE vacations_details 
                    SET 
                        description = ? , 
                        fromDate = ?,
                        toDate =?,
                        price = ?,
                        imageName = ?,
                        target = ?
                  WHERE vacationId = ?`;

    await dal.execute(sql, [vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.imageName, vacation.target, vacation.vacationId]);

    // send updated vacation  for all users by socket:
    socketLogic.adminUpdateVacation(vacation);

    return vacation;

}

async function liveReport() {

    // fetch data to live reports from DB:

    const sql = `SELECT COUNT(userId) AS followers, 
                               target 
                         FROM followed_vacations f_v
                         JOIN vacations_details v_d
                           ON f_v.vacationId = v_d.vacationId 
                     GROUP BY f_v.vacationId;`;

    const result = await dal.execute(sql);
    return result;

};

async function deleteVacation(vacationId: number) {

    const sql = `DELETE v_d.* 
                   FROM vacations_details v_d 
                  WHERE v_d.vacationId = ?;`;

    await dal.execute(sql, [vacationId]);

    // Delete vacation for all users by socket:
    socketLogic.adminDeleteVacation(vacationId);

}

export {
    addNewVacation,
    liveReport,
    deleteVacation,
    updateVacation

}