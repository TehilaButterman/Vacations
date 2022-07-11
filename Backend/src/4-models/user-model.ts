import Joi from 'joi';

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: string;
    public roleId: number;

    public constructor(user: UserModel) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
        this.roleId = user.roleId;
    };

    private static PostValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(30),
        username: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(5).max(130),
        role: Joi.forbidden(),
        roleId: Joi.number().integer().required().min(1).max(3)
    });

    public ValidationPost(): string {
        const result = UserModel.PostValidationSchema.validate(this);
        return result.error?.message;
    };

};

export default UserModel;