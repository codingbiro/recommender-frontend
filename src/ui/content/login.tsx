import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ApolloError } from "apollo-client";
import { UserContext } from "../usercontext";
import { LOGIN_M } from "../../types/models";
import { Redirect } from "react-router-dom";

interface LoginInput {
  password: string;
  email: string;
}

interface LoginUserResponse {
  token: string;
}

interface LoginResponse {
  loginUser: LoginUserResponse;
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuc, setLoginSuc] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [serverErr, setServerErr] = useState(false);
  const refreshUser = useContext(UserContext).refreshUser;

  const loginCompleted = (response: LoginResponse) => {
    if (response) {
      localStorage.setItem("token", response.loginUser.token);
      refreshUser();
      setLoginSuc(true);
    }
  };

  const loginError = (error: ApolloError) => {
    if (error.graphQLErrors[0] && error.graphQLErrors[0].name && error.graphQLErrors[0].name === "WrongCredentialsError") {
      setLoginErr(true);
    }
    else {
      setServerErr(true);
      console.error('Server Error');
    }
  };

  const [login] = useMutation(LOGIN_M, {
    errorPolicy: "all",
    onCompleted: loginCompleted,
    onError: loginError,
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (email && email.includes("@", 1) && email.includes(".", 3)) {
      if (password) {
        let loginData: LoginInput = { email: email, password: password };
        login({ variables: { data: loginData } });
      } else {
        console.error("Enter a password");
      }
    } else {
      setEmailErr(true);
    }
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setLoginErr(false);
    setServerErr(false);
    if (event.currentTarget.name === "email") {
      setEmailErr(false);
      setEmail(event.currentTarget.value);
    }
    if (event.currentTarget.name === "password")
      setPassword(event.currentTarget.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={handleChange}
          placeholder="mail"
          required
        />
      </label>
      <label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="password"
          required
        />
      </label>
      <input className="button" type="submit" value="Log in" />
      {loginSuc && <Redirect to='/dashboard' />}
      {loginErr && <p>Incorrect username or password.</p>}
      {emailErr && <p>Enter a valid e-mail.</p>}
      {serverErr && <p>Server Error.</p>}
    </form>
  );
}
