import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotyfService";
import { useNavigate } from "react-router-dom";
import vacationService from "../../../Services/VacationService";
import socketService from "../../../Services/SocketService";

function Register(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();
    async function send(user: UserModel) {
        user.roleId = 1;
        await authService.register(user)
            .then(good => {
                vacationService.fetchAllVacations()
                socketService.connect()
                notifyService.success('Congratulations! You have been successfully registered')
                navigate('/vacations')
            })
            .catch(err => notifyService.error(err))
    }
    return (
        <form onSubmit={handleSubmit(send)} className="form sign-up">
            <h2 className="form__title">Sign Up</h2>
            <label>
                <span>First name </span>
                <span>{formState.errors.firstName?.message}</span>
                <input type="text" className="input" {...register('firstName', {
                    required: { value: true, message: "Missing First Name" },
                    minLength: { value: 2, message: "- First name is too short" },
                    maxLength: { value: 30, message: "- First name is too long" }
                })} />
            </label>
            <label>
                <span>Last name </span>
                <span>{formState.errors.lastName?.message}</span>
                <input type="text" className="input"  {...register('lastName', {
                    required: { value: true, message: "Missing last name" },
                    minLength: { value: 2, message: "- LastName is too short" },
                    maxLength: { value: 30, message: "- LastName is too long!" }
                })} />
            </label>
            <label>
                <span>Username </span>
                <span>{formState.errors.username?.message}</span>
                <input type="text" className="input"  {...register('username', {
                    required: { value: true, message: "Missing  username" },
                    minLength: { value: 5, message: "- Username is too short" },
                    maxLength: { value: 30, message: "- Username is too long!" }
                })} />
            </label>
            <label>
                <span>Password </span>
                <span>{formState.errors.password?.message}</span>
                <input type="password" className="input"  {...register('password', {
                    required: { value: true, message: "Missing password" },
                    minLength: { value: 5, message: "- Password is too short" },
                    maxLength: { value: 30, message: "- Password is too long!" }
                })} />
            </label>
            <button className="submit">Sign Up Now</button>
        </form>
    );
}

export default Register;
