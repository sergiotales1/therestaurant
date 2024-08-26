import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDrinks2Line } from "react-icons/ri";
import { FaUtensils } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { links } from "../js/data";
import styled from "styled-components";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import logo from "../assets/logo.png";
import { CheckIsLogged } from "../customHooks";
import { handleLogout } from "../js/utils";
import { CircularProgress, Stack } from "@mui/material";

const Wrapper = styled.section`
  /* 
==============
Navbar
==============
*/

  .navbar {
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    padding: 3px 2vw;
    background-color: var(--primary-green);
  }

  .navbar-opacity {
    background-color: rgba(255, 255, 255, 0.9);
  }

  .logo {
    margin-top: -3px;
    width: 200px;
  }

  .links-container {
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    text-align: left;
  }

  .navbar a {
    display: block;
    text-decoration: none;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--primary-bg-white);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .navbar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    height: 70px;
  }

  .navbar-toggle {
    border: transparent;
    font-size: 2.7rem;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: var(--primary-bg-white);
    padding: 10px 0px 0 0;
  }

  .rotate-toggler {
    transform: rotate(90deg);
  }

  .navbar-btn {
    border: transparent;
    text-align: center;
    padding: 10px 2vw;
    background-color: transparent;
  }

  .navbar-btn a {
    display: block;
    border: 2px solid var(--primary-bg-white);
    border-radius: var(--btn-radius);
    padding: 10px 20px;
    color: white;
  }

  .navbar-btn a:hover,
  .navbar-logged-btn:hover,
  .logged-links a:hover {
    color: darkgray;
    border-color: darkgray;
  }
  .links {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
  }

  .links a {
    padding: 0.6rem;
  }

  .links a:hover {
    color: darkgray;
  }

  .links a:focus:not(.submenu) {
    padding-left: 1.2rem;
  }

  .navbar-logged-btn {
    border: transparent;
    background: transparent;
    outline: none;
    font-size: 2.4rem;
    color: var(--primary-bg-white);
    padding: 0.6rem;
    cursor: pointer;
  }

  .logged-links {
    position: absolute;
    background-color: var(--primary-green);
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
  }

  @media screen and (min-width: 800px) {
    .navbar {
      display: grid;
      grid-template-columns: auto 1fr;
    }
    .navbar-toggle {
      display: none;
    }

    .navbar-header {
      height: 90px;
    }

    .logo {
      width: 200px;
    }

    .links-container {
      height: auto !important;
      display: flex;
    }

    .links {
      margin: 0 auto;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
      padding-top: 0;
    }

    .links a:not(.submenu) {
      font-size: 1.4rem;
      padding: 1.5rem;
    }

    .links a:hover {
      background-color: transparent;
      border-radius: var(--btn-radius);
    }

    .links a:focus:not(.submenu) {
      padding-left: 1.5rem;
    }

    .navbar-btn {
      padding: 0;
    }

    .navbar-btn a {
      padding: 10px 25px;
      font-size: 1.4rem;
    }

    .navbar-logged-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: transparent;
      outline: none;
      background: transparent;
      font-size: 3.2rem;
      color: var(--primary-bg-white);
      padding: 10px 25px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .logged-links {
      position: relative;
      background-color: var(--primary-green);
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      padding: 1rem;
      gap: 0.5rem;
    }
  }
`;
const Submenu = styled.div`
  position: absolute;
  background-color: var(--primary-green);
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 1rem;
  .submenu-icon {
    font-size: 2rem;
    display: block;
    margin: 0 auto;
  }

  a {
    padding: 0;
    margin: 0;
  }

  @media (min-width: 800px) {
    padding: 0;
    a.submenu {
      padding: 1rem;
    }
    .submenu-icon {
      font-size: 2.5rem;
    }
  }
`;

function Navbar() {
  const navigation = useNavigation();
  const submenuRef = useRef(null);

  const [showLinks, setShowLinks] = useState(false);
  const [showLoggedLinks, setShowLoggedLinks] = useState(false);
  const { isLoggedIn } = CheckIsLogged();
  const { pathname } = useLocation();

  useEffect(() => {
    setShowLinks(false);
    setShowLoggedLinks(false);
  }, [pathname]);

  useEffect(() => {
    if (showLoggedLinks) {
      document.body.addEventListener("click", handleBodyClickLogged);
    }
  }, [showLoggedLinks]);

  const handleBodyClickLogged = (e) => {
    if (
      e.target.classList.contains("logged-link-icon") ||
      e.target.classList.contains("navbar-logged-btn") ||
      e.target?.parentElement?.classList?.contains("logged-link-icon")
    ) {
      return;
    }
    setShowLoggedLinks(false);
    document.body.removeEventListener("click", handleBodyClickLogged);
  };

  const handleClick = (e, submenuRef) => {
    submenuRef.current.style.display = "flex";
    document.body.addEventListener("click", handleBodyClick);
    document.body.addEventListener("mouseover", handleBodyOver);
  };

  const handleBodyOver = (e) => {
    if (
      e.target.classList.contains("submenu") ||
      e.target.classList.contains("menu") ||
      e.target.classList.contains("navbar-menu-icon") ||
      e.target?.parentElement?.classList?.contains("submenu") ||
      e.target?.parentElement?.classList?.contains("submenu-icon")
    ) {
      return;
    }
    submenuRef.current.style.display = "none";
    document.body.removeEventListener("mouseover", handleBodyOver);
  };

  const handleBodyClick = (e) => {
    if (
      e.target.classList.contains("menu") ||
      e.target.classList.contains("navbar-menu-icon")
    ) {
      return;
    }
    submenuRef.current.style.display = "none";
    document.body.removeEventListener("click", handleBodyClick);
  };

  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const btnRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const linkStyles = {
    height: showLinks
      ? `${
          linksRef.current.getBoundingClientRect().height +
          btnRef.current.getBoundingClientRect().height
        }px`
      : "0px",
  };
  return (
    <Wrapper>
      <nav className={"navbar"}>
        <div className="navbar-header">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <button
            onClick={toggleLinks}
            className={
              showLinks ? "navbar-toggle rotate-toggler" : "navbar-toggle"
            }
          >
            <FaBars />
          </button>
        </div>

        <div
          className="links-container"
          ref={linksContainerRef}
          style={linkStyles}
        >
          <ul className="links" ref={linksRef}>
            {links.map((item) => {
              return (
                <li key={item.id}>
                  {item.text === "menu" ? (
                    <>
                      <Link
                        onClick={(e) => handleClick(e, submenuRef)}
                        onMouseOver={(e) => handleClick(e, submenuRef)}
                        className="menu"
                        to={item.url}
                      >
                        {item.text}

                        <IoMdArrowDropdown className="navbar-menu-icon" />
                      </Link>
                      <Submenu className="submenu" ref={submenuRef}>
                        <Link
                          preventScrollReset={false}
                          className="submenu"
                          to={"drinks"}
                        >
                          <RiDrinks2Line className="submenu-icon" />
                          Drinks
                        </Link>

                        <Link className="submenu" to={"cardapio"}>
                          <FaUtensils className="submenu-icon" />
                          Cardápio
                        </Link>
                      </Submenu>
                    </>
                  ) : (
                    <Link to={item.url}>{item.text}</Link>
                  )}
                </li>
              );
            })}
          </ul>
          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => setShowLoggedLinks(!showLoggedLinks)}
                className="navbar-logged-btn"
                ref={btnRef}
              >
                <FaRegUserCircle className="logged-link-icon" />
              </button>
              {showLoggedLinks ? (
                <div className="logged-links">
                  {navigation.state === "loading" ? (
                    <CircularProgress sx={{ color: "#fafaee" }} />
                  ) : (
                    <Link className="logged-link" to={"dashboard"}>
                      Dashboard
                    </Link>
                  )}
                  <a className="logged-link" href="/" onClick={handleLogout}>
                    Sair
                  </a>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <button type="button" className="navbar-btn" ref={btnRef}>
              <Link to={"/login"}>Log in</Link>
            </button>
          )}
        </div>
      </nav>
    </Wrapper>
  );
}
export default Navbar;
