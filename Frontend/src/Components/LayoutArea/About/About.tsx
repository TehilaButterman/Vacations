import { NavLink } from "react-router-dom";
import "./About.css";
import back2 from '../../../assets/images/back2.gif';

function About(): JSX.Element {
    return (
        <div className="About">
            <img src={back2} />
            <hgroup><span id="underline">Traveling around-the-world</span> <br />
                Choose a destination - check prices - search for dates - booking your trip -  plan the trip - search for attractions
                <br />- - - <br />
                <span id="underline">No more!</span><br />
                The way to the perfect vacation has become shorter than ever.<br />
                You are welcome to visit our website, <br />
                and be updated on the most successful vacations,<br />
                at the most affordable prices !!!<br />
                Join us 👉<NavLink className="join" to="/auth/register">Click here</NavLink>

            </hgroup>
        </div>
    );
}

export default About;
