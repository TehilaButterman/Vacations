import { Request } from 'express';
import jsonwebtoken from 'jsonwebtoken'
import { UnAuthorizedError } from '../4-models/error-model';
import UserModel from '../4-models/user-model';
import crypto from 'crypto'

const secret = 'vocation is the best thing ever!!! we all love vocations';
const salt = 'vacations_project'

function hash(plainText: string): string {

    if (!plainText) return null;
    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest('hex');

    return hashText;

};


async function createNewToken(user: UserModel): Promise<string> {

    const payload = { user };
    const token = jsonwebtoken.sign(payload, secret, { expiresIn: '3h' });
    return token;

}

async function verifyToken(request: Request): Promise<boolean> {

    return new Promise((resolve, reject) => {
        const headers = request.headers.authorization
        if (!headers) {
            reject(new UnAuthorizedError('No token sent'))
        }

        const token = headers.substring(7)
        if (!token) {
            reject(new UnAuthorizedError('No token sent'))

        }

        jsonwebtoken.verify(token, secret, (err) => {
            if (err) {
                reject(new UnAuthorizedError("One or more details are incorrect."))
            }
            resolve(true)
        })
    })
}

function decodeUserObject(request: Request): UserModel {

    const headers = request.headers.authorization;
    const token = headers.substring(7);
    const payload = jsonwebtoken.decode(token);
    const user: UserModel = (payload as any).user;
    return user;

}

export default {
    createNewToken,
    verifyToken,
    decodeUserObject,
    hash
}