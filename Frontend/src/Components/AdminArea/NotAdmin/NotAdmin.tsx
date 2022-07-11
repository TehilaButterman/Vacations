import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import "./NotAdmin.css";

function NotAdmin(): JSX.Element {

    useEffect(() => {
        console.log(authService.isAdmin());

    }, []);

    return (
        <div className="NotAdmin">
            <div className="w3-cursive">
                <h1>Sorry! you are not allow to enter here</h1>
                <NavLink to='/vacations'>Back to all vacations</NavLink>
            </div>
        </div>
    );
}

export default NotAdmin;
