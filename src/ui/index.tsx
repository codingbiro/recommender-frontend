import React from "react";
import { Navbar } from "./navbar";
import { Banner } from "./banner";
import { Content } from "./content/index";
import { BrowserRouter as Router } from "react-router-dom";

interface MyProps { }

interface AppState { }

class App extends React.Component<MyProps, AppState> {
  render() {
    return (
      <Router>
        <main>
          <header>
            <Banner/>
            <Navbar/>
          </header>
          <article>
            <Content/>
          </article>
        </main>
      </Router>
    );
  }
}

export default App;
