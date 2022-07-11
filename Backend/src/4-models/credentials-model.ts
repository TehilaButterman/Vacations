import Joi from 'joi'

class CredentialsModel {

    public username: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    private static CredentialValidation = Joi.object({
        username: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(3).max(30),
    });

    public CredentialsValidation(): string {
        const result = CredentialsModel.CredentialValidation.validate(this);
        return result.error?.message
    }

}
export default CredentialsModel;
