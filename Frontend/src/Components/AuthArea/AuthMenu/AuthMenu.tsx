import Login from "../Login/Login";
import Register from "../Register/Register";
import "./AuthMenu.css";
import { useState } from "react";

function AuthMenu(): JSX.Element {
    const [className, setClassName] = useState<string>('cont s-signup');
    
    function toggleClass() {
        setClassName(className === 'cont s-signup' ? 'cont' : 'cont s-signup')
    }
    return (
        <div className="AuthMenu">
            <div className={className}>
                <Login />
                <div className="sub-cont">
                    <div className="img">
                        <div className="img-text m-up">
                            <h2>New here?</h2>
                            <p>Sign up and discover <br /> great amount of new opportunities!</p>
                        </div>
                        <div className="img-text m-in">
                            <h2>One of us?</h2>
                            <p>If you already has an account,<br /> just sign in. We've missed you!</p>
                        </div>
                        <div className="img-btn" onClick={toggleClass}>
                            <span className="m-up">Sign Up</span>
                            <span className="m-in">Sign In</span>
                        </div>
                    </div>
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default AuthMenu;
