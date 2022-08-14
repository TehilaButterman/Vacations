import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialModel from "../../../Models/CredentialModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotyfService";
import "./Login.css";
import vacationService from "../../../Services/VacationService";
import socketService from "../../../Services/SocketService";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialModel>();

    const navigate = useNavigate();

    async function send(credential: CredentialModel): Promise<void> {
        try {
            await authService.login(credential);
            notifyService.success('Welcome! You have been successfully logged in!');
            const isAdmin = authService.isAdmin();
            if (isAdmin) {
                socketService.connect()
                navigate('/admin-page')
            } else {
                const allVacations = await vacationService.fetchAllVacations();
                socketService.connect()
                navigate('/vacations');
            }

        }
        catch (err) {
            notifyService.error(err)
        }
    }
    return (

        <form onSubmit={handleSubmit(send)} className="form sign-in">
            <h2>Sign In</h2>
            <label>
                <span>Username </span>
                <span>{formState.errors.username?.message}</span>
                <input type="text" className="input" {...register('username', {
                    required: { value: true, message: "- Missing Username" }
                })} />
            </label>
            <label>
                <span>Password </span>
                <span>{formState.errors.password?.message}</span>
                <input type="password" className="input"  {...register('password', {
                    required: { value: true, message: "- Missing password" },
                    minLength: { value: 5, message: "- Password is too short" },
                    maxLength: { value: 30, message: "- Password is too long!" }
                })} />
            </label>
            <button className="submit">Sign In</button>
        </form>

    );
}

export default Login;
