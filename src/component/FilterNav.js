import React, { useState, useEffect } from "react";
import "../css/filternav.css";
import { FiMenu } from "react-icons/fi";
import PreferencesSidebar from "../component/PreferencesSidebar";
const FilterNav = () => {
  const [navbarFilterBg, setnavbarFilterBg] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setnavbarFilterBg(true);
    } else {
      setnavbarFilterBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(true);
  const toggleShow = () => {
    setshow((prevShow) => !prevShow);
    setshow1(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar12 = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`custom-navbarFilter ${
        navbarFilterBg ? "navbarFilter-bg" : "bg-transparent"
      }`}
      style={{ height: "60px" }}
    >
      <div className="container-fluid r2">
        <div className="navbarFilter-brand">
          <img src="../img/blogo.svg" alt="HJ Real Estates" className="logo" />
        </div>
        <div className="navbarFilter-toggler">
          <span className="navbarFilter-toggler-icon">
            <FiMenu style={{ color: "white" }} onClick={toggleShow} />
          </span>
        </div>
        {show1 && (
          <div className="navbarFilter-collapse" id="hidenav">
            <ul className="navbarFilter-nav">
              <li className="navFilter-item">
                <a
                  className="navFilter-link"
                  href="#"
                  style={{ color: "white", fontSize: "15px" }}
                >
                  Holidays Homes &nbsp;&nbsp;|{" "}
                </a>
              </li>
              <li className="navFilter-item">
                <a
                  className="navFilter-link"
                  href="#"
                  style={{ color: "white", fontSize: "15px" }}
                >
                  +971 4326 2191 &nbsp;&nbsp;|
                </a>
              </li>
              <li className="navFilter-item">
                <a
                  className="navFilter-link"
                  href="#"
                  style={{
                    color: "white",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={toggleSidebar12}
                >
                  Menu
                </a>
                <PreferencesSidebar isOpen={isOpen} toggle={toggleSidebar12} />
              </li>
            </ul>
          </div>
        )}
        {show && (
          <div className="navbarFilter-collapse">
            <ul className="navbarFilter-nav">
              <li className="navFilter-item">
                <a
                  className="navFilter-link"
                  href="#"
                  style={{ fontSize: "15px" }}
                >
                  Holidays Homes &nbsp;&nbsp;|{" "}
                </a>
              </li>
              <li className="navFilter-item">
                <a
                  className="navFilter-link"
                  href="#"
                  style={{ fontSize: "15px" }}
                >
                  +971 4326 2191 &nbsp;&nbsp;|
                </a>
              </li>
              <li className="navFilter-item">
                <a
                  className="navFilter-link"
                  href="#"
                  style={{ fontSize: "15px" }}
                  onClick={toggleSidebar12}
                >
                  Menu
                </a>
                <PreferencesSidebar isOpen={isOpen} toggle={toggleSidebar12} />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterNav;
