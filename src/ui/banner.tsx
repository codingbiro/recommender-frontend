import React, { useContext } from "react";
import { UserContext } from "./usercontext";

interface welcomeProps { }

export function Banner(props: welcomeProps) {
  const isLoggedIn = useContext(UserContext).isLoggedIn;
  const name = useContext(UserContext).user?.name;
  if (isLoggedIn) {
    return (
      <h1>
        Hello, {name ? name : "Stranger"}
        <span className="active">!</span>
      </h1>
    );
  }
  else {
    return (
      <h1>
        Hello, Stranger<span className="active">!</span>
      </h1>
    );
  }
}
