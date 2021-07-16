import "./App.css";
import React from "react";
import HomePage from "./containers/Home";
import { makeServer } from "./mirage/index";

const environment = process.env.NODE_ENV;

if (environment !== "production") {
  makeServer({ environment });
}

export function App() {
  return (
    <>
      <HomePage></HomePage>
    </>
  );
}

export default App;
