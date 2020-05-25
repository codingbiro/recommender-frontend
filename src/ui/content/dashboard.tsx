import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Recommendations } from "./recommendations";
import { UserContext } from "../usercontext";

interface dashProps { }

export function Dashboard(props: dashProps) {
  const [logout, setLogout] = useState(false);
  const userCtx = useContext(UserContext);
  const user = userCtx.user;
  const refeshUser = userCtx.refreshUser;

  if (!user) return <h1>Log in to view page.</h1>;
  let ageP =
    user.age && user.age !== -1 ? (
      <p>Age: {user.age}</p>
    ) : (
        <p>No age set</p>
      );
  return (
    <aside>
      <p>Name: {user.name}</p>
      {ageP}
      <p><a href="/dashboard/reviews">View my reviews</a></p>
      <pre>Recommendations for you:</pre>
      <Recommendations />
      <button id="logOut"
        onClick={(e: React.FormEvent) => {
          localStorage.removeItem("token");
          refeshUser();
          setLogout(true);          

        }}
      >
        Log out
      </button>
      {logout && <Redirect to='/' />}
    </aside>
  );
}
