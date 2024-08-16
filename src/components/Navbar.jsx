import { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDrinks2Line } from "react-icons/ri";
import { FaUtensils } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { links } from "../js/data";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { handleClick } from "../js/utils";

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
    backdrop-filter: blur(4px);
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

  .navbar-btn a:hover {
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

  .links a:focus {
    padding-left: 1.2rem;
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
    .links a:focus {
      padding: 1.5rem;
    }

    .navbar-btn {
      padding: 0;
    }

    .navbar-btn a {
      padding: 10px 25px;
      font-size: 1.4rem;
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
  const myRef = useRef(null);

  const [showLinks, setShowLinks] = useState(false);

  const handleClick = (e, myRef) => {
    myRef.current.style.display = "flex";
    document.body.addEventListener("click", handleBodyClick);
    document.body.addEventListener("mouseover", handleBodyOver);
  };

  const handleBodyOver = (e) => {
    if (
      e.target.classList.contains("submenu") ||
      e.target.classList.contains("menu") ||
      e.target.classList.contains("navbar-menu-icon") ||
      e.target.parentElement.classList.contains("submenu") ||
      e.target.parentElement.classList.contains("submenu-icon")
    ) {
      return;
    }
    myRef.current.style.display = "none";
    document.body.removeEventListener("mouseover", handleBodyOver);
  };

  const handleBodyClick = (e) => {
    if (
      e.target.classList.contains("menu") ||
      e.target.classList.contains("navbar-menu-icon")
    ) {
      return;
    }
    myRef.current.style.display = "none";
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
          <a href="#">
            <img src="logo.png" alt="logo" className="logo" />
          </a>
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
                        onClick={(e) => handleClick(e, myRef)}
                        onMouseOver={(e) => handleClick(e, myRef)}
                        className="menu"
                        to={item.url}
                      >
                        {item.text}

                        <IoMdArrowDropdown className="navbar-menu-icon" />
                      </Link>
                      <Submenu className="submenu" ref={myRef}>
                        <Link className="submenu" to={"drinks"}>
                          <RiDrinks2Line className="submenu-icon" />
                          Drinks
                        </Link>

                        <a className="submenu" href="#">
                          <FaUtensils className="submenu-icon" />
                          Cardápio
                        </a>
                      </Submenu>
                    </>
                  ) : (
                    <a href={item.url}>{item.text}</a>
                  )}
                </li>
              );
            })}
          </ul>
          <button className="navbar-btn" ref={btnRef}>
            <a target="_blank">Log in</a>
          </button>
        </div>
      </nav>
    </Wrapper>
  );
}
export default Navbar;
