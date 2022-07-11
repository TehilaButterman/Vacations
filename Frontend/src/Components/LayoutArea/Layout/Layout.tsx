import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <div className="frame">
                <header>
                    <Header />
                </header>
            </div>
            <article>
                <Routing />
            </article>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
