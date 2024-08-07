import { useEffect, useRef, useState } from "react";
import "../css/componenets/Navbar.css";
import { Link } from "wouter";
import { SiApplemusic } from "react-icons/si";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export function Navbar() {
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const navRef = useRef();

  const toggleSticky = () => {
    const isSticky = window.scrollY > 0;
    navRef.current.classList.toggle("sticky", isSticky);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleSticky);

    return () => {
      window.removeEventListener("scroll", toggleSticky);
    };
  }, []);

  const toggleNavigation = () => {
    setNavigationOpen(!isNavigationOpen);
  };

  const closeNavigation = () => {
    window.scrollTo(0, 0);
    setNavigationOpen(false);
  };

  return (
    <nav ref={navRef}>
      <Link href="/" id="navbar-logo" onClick={closeNavigation}>
        <SiApplemusic />
      </Link>

      <ul className={isNavigationOpen ? "active" : ""}>
        <li>
          <Link
            href="/"
            className={(active) => (active ? "active" : "")}
            onClick={closeNavigation}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/music"
            className={(active) => (active ? "active" : "")}
            onClick={closeNavigation}
          >
            Music
          </Link>
        </li>
        <li>
          <Link
            href="/movies"
            onClick={closeNavigation}
            className={(active) => (active ? "active" : "")}
          >
            Videos
          </Link>
        </li>
      </ul>

      <div id="mobile-toggle">
        {isNavigationOpen ? (
          <FaTimes className="mobile-toggle-btn" onClick={toggleNavigation} />
        ) : (
          <FaBars className="mobile-toggle-btn" onClick={toggleNavigation} />
        )}
      </div>
    </nav>
  );
}
