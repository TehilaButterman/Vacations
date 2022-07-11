import "./HomePage.css";
import back2 from '../../../assets/images/back2.gif';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ShareIcon from '@mui/icons-material/Share';
import ContactMailIcon from '@mui/icons-material/ContactMail';

function HomePage(): JSX.Element {
    return (
        <div className="HomePage">
            <div className="title" >
                <div className="arrow-wrapper"></div>
                <hgroup>Your world. <span id="underline">Your way.</span> <br />
                    Exclusive vacations for travelers. <span id="underline">Enjoy!</span></hgroup>
            </div>
            <div className="subtitle">
                <p id="subtitle1">The best place for travelers! A whole world in a single website.
                </p>
            </div>
            <div className="hero-img"></div>
            <div className="companies">
            </div>
            <div className="blog-wrapper" id="blog">
                <div className="blog-post-wrapper">
                    <div className="blog-img">
                        <img src={back2} id="blog-img" />
                    </div>
                    <div className="blog-content">
                        <hgroup>A variety of vacations around the world<span id="underline"> at the best prices</span> <br />Feel free to follow</hgroup>
                    </div>
                </div>
            </div>
            <div className="services" id="services">
                <div className="service-header">
                    <h1>Travel around the world</h1>
                    <div className="cards-wrapper">
                        <div className="card">
                            <h2>Vacation Mode</h2>
                            <div className="icon">
                                <BeachAccessIcon sx={{ fontSize: "80px" }} />
                            </div>
                            <p>
                                Are you looking for the best vacation?
                                Here you have the full list of all the perfect vacations around the world.
                                Wanna see it?
                                Simply login, and  we'll take care of the rest.</p>
                        </div>
                        <div className="card">
                            <h2>Share</h2>
                            <div className="icon">
                                <ShareIcon sx={{ fontSize: "80px" }} />
                            </div>
                            <p>Share us with your friends so we can expand the site's activity - for you!<br /></p>
                        </div>
                        <div className="card">
                            <h2>Contact us</h2>
                            <div className="icon">
                                <ContactMailIcon sx={{ fontSize: "80px" }} />
                            </div>
                            <p>Want to add a vacation? <br />Do you have any ideas for improvement?<br />
                                For comments and insights on any topic<br />
                                Contact us: <br />
                                butfami581@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;