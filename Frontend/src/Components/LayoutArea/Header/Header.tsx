import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from '../../../assets/images/logo.png'
import authService from "../../../Services/AuthService";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotyfService";

function Header(): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    useEffect(() => {
        setUser(store.getState().authState.user)
        const unSubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user)
        })
        return (() => {
            unSubscribe()
        })
    }, []);

    const navigate = useNavigate()
    function logout() {
        navigate('/home-page');
        authService.logout();
        notifyService.success("You have been successfully logged out")
    }
    return (
        <header>
            <div className="left">
                <NavLink to="/home-page"><img src={logo} /></NavLink>
                <NavLink to="/home-page">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to={user ? user.role === "User" ? "/vacations" : "/admin-page" : "/auth/register"}>Vacations</NavLink>
            </div>
            <div className="right">
                {!user &&
                    <>
                        <h3>Hello guest</h3>
                        <NavLink to="/auth/register" id="sign-in">sign in | sign up</NavLink>
                    </>
                }
                {user &&
                    <>
                        <h3>Hello {user.firstName} {user.lastName}</h3>
                        <button className="logout" onClick={logout}>Logout</button>
                    </>
                }
            </div>
        </header >
    );
}
export default Header;
