import { useState, useEffect } from 'react'
import "../styles/Navebar.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navebar() {

    const [hamb, changehamb] = useState(false);
    const [popup, changepopup] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const Show_Nav_Links = () => {
        changehamb(!hamb);
        setTimeout(() => {
            changepopup(!popup);
        }, 1);
    }

    const closeNavbar = () => {
        Show_Nav_Links();
    }


    useEffect(() => {
        if (hamb) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [hamb]);


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const handleContriClick = () => {
        if (location.pathname === '/') {
            changehamb(false);
            setTimeout(() => {
                changepopup(!popup);
            }, 1);
            const el = document.getElementById("Contributors");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/", { state: { scrollToAbout: true } });
        }
        
    };
    const handleAboutClick = () => {
        if (location.pathname === '/') {
            changehamb(false);
            setTimeout(() => {
                changepopup(!popup);
            }, 1);
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/", { state: { scrollToAbout: true } });
        }
        
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo" onClick={() => navigate("/")}>
                <img style={{ height: '40px', width: '40px' }} src="/favicon_io/favicon-32x32.png" alt="" />
            </div>
            <div className="nav-buttons">
                <ul className={hamb ? `mobile-ham ${popup ? 'Active' : ''}` : "nav-links"}>
                    <div className={hamb ? "heading-open" : "heading-close"}>
                        <img style={{ height: '40px', width: '40px' }} src="/favicon_io/favicon-32x32.png" alt="" />
                        <svg onClick={closeNavbar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#005dff" fill="none">
                            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <li><Link className={location.pathname === "/" ? "highlight" : ""} to="/">Home</Link></li>
                     <li><a onClick={handleAboutClick} >About</a></li>
                    <li><Link className={location.pathname === "/visualize" ? "highlight" : ""} to="/visualize">Visualize</Link></li>
                    <li><a onClick={handleContriClick} >Contributors</a></li>
                </ul>

                <svg onClick={Show_Nav_Links} className='hamburger' xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" width="28" height="28" color="#54af6b" fill="none">
                    <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </nav>
    )
}
