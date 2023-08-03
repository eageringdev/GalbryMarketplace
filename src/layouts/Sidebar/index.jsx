import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./index.scss";

// import icons
import {
  BsFillGrid3X3GapFill,
  BsFillPaletteFill,
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
} from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { BiUser } from "react-icons/bi";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const media = matchMedia("(max-width: 575px)");
    if (media.matches && extended) {
      setExtended(false);
    }
    media.onchange = ({ matches }) => {
      matches ? setExtended(false) : setExtended(true);
    };
  }, []);

  return (
    <>
      <div
        className="sidebar"
        style={{
          left: extended ? 0 : -60,
        }}
      >
        <nav className="sidebar_nav">
          <div>
            <Link
              to="/explore"
              className={
                "sidebar_item " +
                (location.pathname.includes("/explore") ? "active" : "")
              }
            >
              <span className="sidebar_icon">
                <BsFillGrid3X3GapFill size={24} />
              </span>
            </Link>
            <Link
              to="/create-asset"
              className={
                "sidebar_item " +
                (location.pathname.includes("/create-asset") ? "active" : "")
              }
            >
              <span className="sidebar_icon">
                <BsFillPaletteFill size={24} />
              </span>
            </Link>
            <Link
              to="/profile"
              className={
                "sidebar_item " +
                (location.pathname.includes("/profile") ? "active" : "")
              }
            >
              <span className="sidebar_icon">
                <BiUser size={24} />
              </span>
            </Link>
          </div>
          <Link
            to="/logout"
            className={
              "sidebar_item " +
              (location.pathname.includes("/logout") ? "active" : "")
            }
          >
            <span className="sidebar_icon">
              <FiLogOut size={24} />
            </span>
          </Link>
        </nav>
      </div>
      <div
        className="sidebar_toggle"
        style={{
          left: extended ? 20 : -8,
          top: "50%",
        }}
      >
        {extended ? (
          <BsChevronDoubleLeft
            onClick={() => {
              setExtended(!extended);
            }}
            size={24}
          />
        ) : (
          <BsChevronDoubleRight
            onClick={() => {
              setExtended(!extended);
            }}
            size={24}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
