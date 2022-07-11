import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="aks-404-page">
            <div className="aks-404-page-content">
                <h1>404</h1>
                <h3>Page not found</h3>
                <NavLink to="/home-page" className="aks-404-page-btn">BACK TO HOME</NavLink>
            </div>
        </div>);
}

export default PageNotFound;
