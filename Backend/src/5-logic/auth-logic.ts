import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { UnAuthorizedError, ValidationError } from "../4-models/error-model";
import UserModel from "../4-models/user-model";
import cyber from '../2-utils/cyber'

async function login(credentials: CredentialsModel): Promise<string> {

    // Validation before sending to DB - according to Joi validation (model)
    const errors = credentials.CredentialsValidation();

    if (errors) {
        throw new ValidationError(errors);
    }

    // encoding password - security
    credentials.password = cyber.hash(credentials.password)

    // Fetch user details from DB
    const sql = `SELECT users.userId, users.firstName, users.lastName, users.username, users.password, roles.roleType role FROM users JOIN roles ON users.role = roles.roleId WHERE username = ? AND password = ? ;`;


    const details: OkPacket = await dal.execute(sql, [credentials.username, credentials.password]);

    // selected user doesn't exist:
    if (details[0] === undefined) throw new UnAuthorizedError('Error, username or password are wrong.');

    // Selected user exists, return token to the front:
    const token = cyber.createNewToken(details[0]);

    return token;

};


async function isUniqueDetails(username: string) {

    // check if username exists already:
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE username = ?) AS isExists;`;

    const result: OkPacket = await dal.execute(sql, [username]);

    const isExists = result[0].isExists;

    return isExists === 1; // <-- username exists already
};


async function register(user: UserModel): Promise<string> {

    // Validate details before send it to DB - according to joi validation:
    const errors = user.ValidationPost();

    if (errors) {
        throw new ValidationError(errors);
    };

    // Check if username is unique - required:
    if (await isUniqueDetails(user.username)) {

        throw new ValidationError('Username or password are forbidden.Please try again.');

    };

    // encoding password - security:
    user.password = cyber.hash(user.password);


    const sql = `INSERT INTO users VALUES( DEFAULT, ? , ? , ? , ? , ? )`;

    const userDetails: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.roleId]);

    // Add userId to user from DB:
    user.userId = userDetails.insertId;

    user.role = "User";

    const token = cyber.createNewToken(user);

    return token;

};

async function pass(pass: string) {
    const password = cyber.hash(pass)
    console.log(password, '\n');

}

export default {
    login,
    register,
    pass
};