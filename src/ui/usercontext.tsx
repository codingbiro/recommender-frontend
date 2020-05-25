import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import App from ".";
import { User } from "../types/typedefs";
import { WHO_Q } from "../types/models";

interface UserCtx {
  user?: User;
  refreshUser: () => void;
  isLoggedIn: boolean;
}

const defUserCtx: UserCtx = {
  refreshUser: () => { },
  isLoggedIn: false,
}

export const UserContext = React.createContext(defUserCtx);

export default function ShieldedApp() {
  const { loading, error, data, refetch } = useQuery<{ whoami: User }>(WHO_Q, { onCompleted: () => setLoggedIn(data ? true : false) });
  const [loggedIn, setLoggedIn] = useState(false);
  const refetchUser = async () => {
    try {
      const { data: newData } = await refetch();
      if (newData) setLoggedIn(true);
    }
    catch (error) {
      setLoggedIn(false);
    }
  };

  if (loading) return <p>Loading ...</p>;

  let netErr = "";
  if (error && error.networkError) netErr = error.networkError.message + " - ";

  if (error && !error.message.includes("Not Authorised"))
    return (
      <h1>
        {netErr}Server Error<span className="active">.</span>
      </h1>
    );
  return (
    <UserContext.Provider value={{ user: data && data.whoami, refreshUser: refetchUser, isLoggedIn: loggedIn }}>
      <App />
    </UserContext.Provider>
  );
}
