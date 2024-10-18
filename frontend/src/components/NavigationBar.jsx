import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef } from "react";
import { Collapse } from "bootstrap";

const NavigationBar = () => {
  const { authenticated } = useAuth();
  const navbarTogglerRef = useRef(null); // To reference the navbar collapse

  const handleNavLinkClick = () => {
    // Collapse the navbar after clicking a link
    const navbarCollapse = navbarTogglerRef.current;
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new Collapse(navbarCollapse);
      bsCollapse.hide(); // Manually collapse the navbar
    }
  };

  useEffect(() => {
    console.log("authenticated", authenticated)
  }, [authenticated])

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">eNagar</a>

          {/* Navbar toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links collapse */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02" ref={navbarTogglerRef}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex justify-content-center align-items-center">
              {authenticated && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={handleNavLinkClick}>
                    Home
                  </Link>
                </li>
              )}
              {authenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/property-tax" onClick={handleNavLinkClick}>
                    Property-tax
                  </Link>
                </li>
              )}
              {authenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" onClick={handleNavLinkClick}>
                    Profile
                  </Link>
                </li>
              )}
              {!authenticated && (
                <li className="nav-item mt-2 mx-2">
                  <Link className="btn btn-outline-secondary" to="/login" onClick={handleNavLinkClick}>
                    Login
                  </Link>
                </li>
              )}
              {!authenticated && (
                <li className="nav-item mt-2 mx-2">
                  <Link className="btn btn-outline-secondary" to="/admin/login" onClick={handleNavLinkClick}>
                    Admin Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
