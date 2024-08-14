import { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDrinks2Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { links } from "../js/data";
import "./navbar.css";
import styled from "styled-components";

const Submenu = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: red;
  display: none;
`;

function Navbar() {
  const myRef = useRef(null);
  const handleMouseOver = (e) => {
    // TODO: now we can manipulate dom with useref
    console.log("test");
    console.log(myRef.current);
    myRef.current.classList.add("show");
  };

  const [showLinks, setShowLinks] = useState(false);

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
    <nav className={"navbar"}>
      <div className="navbar-header">
        <a href="#">
          <img
            src="\images\hero\janepet-logo.png"
            alt="logo"
            className="logo"
          />
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
                    <a onMouseOver={handleMouseOver} href={item.url}>
                      {item.text}

                      <IoMdArrowDropdown className="navbar-menu-icon" />
                    </a>
                    <Submenu ref={myRef}>
                      <RiDrinks2Line />
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
  );
}
export default Navbar;
