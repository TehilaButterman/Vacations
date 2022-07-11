import jwtDecode from "jwt-decode";
import CredentialModel from "../Models/CredentialModel";
import UserModel from "../Models/UserModel";

export class AuthState {
    public user: UserModel;
    public token: string;
    public constructor() {
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.user = (jwtDecode(this.token) as any).user;
        }
    }
}

export enum AuthActionType {
    "Register" = "Register",
    "Login" = "Login",
    "Logout" = "Logout"
};

export interface AuthAction {
    type: AuthActionType,
    payload?: any;
};

export function RegisterAction(user: UserModel): AuthAction {
    const action: AuthAction = {
        type: AuthActionType.Register,
        payload: user
    };
    return action;
};

export function LoginAction(credential: CredentialModel): AuthAction {
    const action: AuthAction = {
        type: AuthActionType.Login,
        payload: credential
    };
    return action;
};

export function LogoutAction(): AuthAction {
    const action = { type: AuthActionType.Logout }
    return action;
};

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            const token = action.payload
            newState.user = (jwtDecode(token) as any).user;
            newState.token = token;
            localStorage.setItem('token', token);
            break;
        case AuthActionType.Logout:
            newState.user = null;
            newState.token = null;
            localStorage.removeItem('token');
            break;
    };
    return newState;
}