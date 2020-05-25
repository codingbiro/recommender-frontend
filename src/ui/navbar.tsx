import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./usercontext";

interface navItemProps {
  name: string;
  url: string;
}

function NavItem(props: navItemProps) {
  return (
    <li>
      <NavLink exact to={props.url}>
        {props.name}
      </NavLink>
    </li>
  );
}

interface navbarProps { }

export function Navbar(props: navbarProps) {
  const loggedIn = useContext(UserContext).isLoggedIn;
  
  if (loggedIn) {
    return (
      <ul>
        <NavItem url="/" name="Home" />
        <NavItem url="/movies" name="Movies" />
        <NavItem url="/dashboard" name="Dashboard" />
      </ul>
    );
  }
  else {
    return (
      <ul>
        <NavItem url="/" name="Home" />
        <NavItem url="/login" name="Login" />
        <NavItem url="/register" name="Register" />
      </ul>
    );
  }
}
