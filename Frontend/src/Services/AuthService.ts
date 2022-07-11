import axios from "axios";
import CredentialModel from "../Models/CredentialModel";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";
import store from '../Redux/Store';
import { LoginAction, LogoutAction, RegisterAction } from "../Redux/AuthState";
import socketService from "./SocketService";
import { InitState } from "../Redux/VacationState";


class AuthService {

    public async register(user: UserModel): Promise<UserModel> {

        const response = await axios.post<UserModel>(config.registerUrl, user);
        const userAdded = response.data;
        socketService.connect();
        store.dispatch(RegisterAction(userAdded));
        console.log(user);
        return userAdded;

    };


    public async login(credentials: CredentialModel): Promise<void> {

        const response = await axios.post<CredentialModel>(config.loginUrl, credentials);
        const token = response.data;

        store.dispatch(LoginAction(token));
    };


    public logout() {
        if (store.getState().authState.user.role === "User") {
            socketService.disconnect();
        }

        store.dispatch(LogoutAction());
        store.dispatch(InitState());
    };


    public isAdmin(): boolean {
        return store.getState().authState.user.role === "Admin";
    }


    public isLoggedIn(): boolean {
        return store.getState().authState.user !== null;
    };

};

const authService = new AuthService();
export default authService;