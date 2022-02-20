import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderWrapper from "./style.header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { removeCookie } from "../../util/sessions";
import { TOKEN } from "../../util/constants";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

const excludedPath = ["/", "/login"];
const exludeLogoutPath = ["/login"];

const Header = () => {
  const Router = useRouter();
  const [search, setsearch] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    Router.push(`/search/${search}`);
    console.log(search);
  }

  useEffect(() => {
    if (
      Object.keys(Router.query).length &&
      Router.pathname !== "/profile/[profile] || /Privacy"
    )
      setsearch(Object.values(Router.query)?.[0]);
  }, [Router?.query]);

  const removeToken = () => {
    removeCookie(TOKEN);
    Router.push(`/login/`);
  };

  const showLogout = !exludeLogoutPath.includes(Router.pathname) && excludedPath.includes('/Privacy');
  const showSearchbar = !excludedPath.includes(Router.pathname) && excludedPath.includes('/Privacy');
  return (
    <HeaderWrapper>
      <div className="header">
        <div className="logo-outer">
          <Link href="/">
            <a>
              <span className="logo">
                <img src="/Reegram-logo.png" />
              </span>
              <span>ReeGram</span>
            </a>
          </Link>
        </div>
        <div className="container">
          {showSearchbar && (
            <div className="search-outer">
              <form className="searchbar" onSubmit={handleSubmit}>
                <div className="search-field">
                  <input
                    required
                    type="text"
                    placeholder="Search Profile / Hashtags "
                    name="search"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                </div>
                <button type="submit" className="search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          )}
        </div>
        <div style={{ display:"flex", justifyContent:"space-evenly", alignItems:"center", width:"30%"}}>
          <Link href="/TermCondition">Terms & Condition</Link>
          <Link href="/Privacy">Privacy Policy</Link>
        </div>
        <div className="Hamburger" style={{
          width: "30%",
        }}>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/About us">About us</Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <Link href="/privacy">Privacy Policy</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/termcondition">Terms & Condition</Link>
            </MenuItem> */}
            {showLogout && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  removeToken();
                }}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
