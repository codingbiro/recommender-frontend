import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ApolloError } from "apollo-client";
import { REG_M } from "../../types/models";

interface UserCreateInput {
  name: string;
  email: string;
  password: string;
  age: number;
}

interface SignupResponse {
  name: string;
}

interface RegisterResponse {
  signupUser: SignupResponse;
}

function RegForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailTaken, setEmailTakenErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [matchingErr, setMatchingErr] = useState(false);
  const [serverErr, setServerErr] = useState(false);

  const registerCompleted = (response: RegisterResponse) => { };

  const registerError = (error: ApolloError) => {
    if (error.graphQLErrors[0] && error.graphQLErrors[0].name && error.graphQLErrors[0].name === "EmailTakenError") {
      setEmailTakenErr(true);
    }
    else {
      setServerErr(true);
      console.error('Server Error');
    }
  };

  const [register, { data: success }] = useMutation(REG_M, {
    errorPolicy: "all",
    onCompleted: registerCompleted,
    onError: registerError,
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (email && email.includes("@", 1) && email.includes(".", 3)) {
      if (password && password.length > 6) {
        if (password === password2) {
          if (name) {
            let registerData: UserCreateInput = {
              name: name,
              email: email,
              password: password,
              age: -1,
            };
            register({ variables: { data: registerData } });
          } else {
            console.error("Enter a name.");
          }
        } else {
          setMatchingErr(true);
        }
      } else {
        console.error("Password must be at least 7 chars long.");
      }
    } else {
      setEmailErr(true);
    }
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setEmailTakenErr(false);
    setServerErr(false);
    if (event.currentTarget.name === "email") {
      setEmailErr(false);
      setEmail(event.currentTarget.value);
    }
    if (event.currentTarget.name === "name") {
      setName(event.currentTarget.value);
    }
    if (event.currentTarget.name === "password") {
      setMatchingErr(false);
      setPassword(event.currentTarget.value);
    }
    if (event.currentTarget.name === "password2") {
      setMatchingErr(false);
      setPassword2(event.currentTarget.value);
    }
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
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="name"
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
          minLength={7}
          required
        />
        <input
          name="password2"
          type="password"
          value={password2}
          onChange={handleChange}
          placeholder="password again"
          minLength={7}
          required
        />
      </label>
      <input className="button" type="submit" value="Register" />
      {emailTaken && <p>Error in registration. Invalid data or e-mail is taken.</p>}
      {emailErr && <p>Enter a valid e-mail address.</p>}
      {matchingErr && <p>Passswords do not match.</p>}
      {success && <p>Successfull registration. Now you can log in.</p>}
      {serverErr && <p>Server error.</p>}
    </form>
  );
}

export function Register() {
  return <RegForm />;
}
