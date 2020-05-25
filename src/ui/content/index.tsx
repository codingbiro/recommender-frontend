import React, { useContext } from "react";
import { Login } from "./login";
import { Movies } from "./movies";
import { Register } from "./register";
import { Dashboard } from "./dashboard";
import { PageNotFound } from "./notfound";
import { Home } from "./home";
import { Switch, Route, Redirect } from "react-router-dom";
import { Reviews } from "./reviews";
import { Movie } from "./movies/movie";
import { UserContext } from "../usercontext"

interface contentProps { }

export function Content(props: contentProps) {
  const user = useContext(UserContext).user;
  
  if (user) {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/movie/:movieId">
          <Movie />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard/reviews">
          <Reviews />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    );
  }
  else {
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/movies">
          <Redirect to='/login' />
        </Route>
        <Route path="/movie/:movieId">
          <Redirect to='/login' />
        </Route>
        <Route exact path="/dashboard">
          <Redirect to='/login' />
        </Route>
        <Route exact path="/dashboard/reviews">
          <Redirect to='/login' />
        </Route>
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}
