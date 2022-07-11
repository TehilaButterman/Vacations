import { Navigate, Route, Routes } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import VacationList from "../../VacationArea/VacationList/VacationList";
import AdminGraph from "../../AdminArea/AdminGraph/AdminGraph";
import HomePage from "../HomePage/HomePage";
import AdminHomePage from "../../AdminArea/AdminHomePage/AdminHomePage";
import PageNotFound from "../PageNotFound/PageNotFound";
import About from "../About/About";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import NotAdmin from "../../AdminArea/NotAdmin/NotAdmin";

function Routing(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(store.getState().authState.user);

        const unsubscribe = store.subscribe(() => {

            const dup = { ...store.getState().authState.user };
            setUser(dup);

        })
        return (() => {
            unsubscribe();
        });
        
    }, [])

    return (
        <div className="Routing">
            <Routes>
                <Route path={"/"} element={<Navigate to='/home-page' />} />
                <Route path="/about" element={<About />} />
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/auth/register" element={<AuthMenu />} />
                {user &&
                    <>
                        <Route path="/vacations" element={<VacationList />} />
                        <Route path="/admin-page/add-vacation" element={user.role === "Admin" ? <AddVacation /> : <NotAdmin />} />
                        <Route path="/admin-page" element={user.role === "Admin" ? <AdminHomePage /> : <NotAdmin />} />
                        <Route path="/admin-page/live-reports" element={user.role === "Admin" ? <AdminGraph /> : <NotAdmin />} />
                    </>
                }
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
