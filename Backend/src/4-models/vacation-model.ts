import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {

    public vacationId: number;
    public description: string;
    public target: string;
    public imageName: string;
    public image?: UploadedFile;
    public fromDate: string;
    public toDate: string;
    public price: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.target = vacation.target;
        this.image = vacation.image
        this.fromDate = vacation.fromDate;
        this.toDate = vacation.toDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName
    };

    private static postValidateSchema = Joi.object({
        vacationId: Joi.forbidden(),
        description: Joi.string().required().min(8).max(300),
        target: Joi.string().required().min(2).max(30),
        imageName: Joi.forbidden(),
        image: Joi.object(),
        fromDate: Joi.string().required().min(8).max(30),
        toDate: Joi.string().required().min(8).max(30),
        price: Joi.number().required().min(100).max(1000000),
    });

    private static putValidateSchema = Joi.object({
        vacationId: Joi.number().integer().required().min(0).max(1000000),
        description: Joi.string().required().min(8).max(300),
        target: Joi.string().required().min(2).max(30),
        imageName: Joi.string().optional().min(30).max(60),
        image: Joi.optional(),
        fromDate: Joi.string().required().min(8).max(30),
        toDate: Joi.string().required().min(8).max(30),
        price: Joi.number().required().min(100).max(1000000)
    });

    public ValidatePost(): string {
        const result = VacationModel.postValidateSchema.validate(this);
        return result.error?.message;
    };

    public ValidatePut(): string {
        const result = VacationModel.putValidateSchema.validate(this);
        return result.error?.message;
    };

}

export default VacationModel;