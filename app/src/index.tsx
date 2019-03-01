/**
 * created by MS 01.03.2019
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Clock } from "./components/clock";

/*
ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById("example")
);*/

const clockEl = document.getElementById("clock");
if (clockEl) {
  ReactDOM.render(
    <Clock size={200} timeFormat="24hour" hourFormat="standard" />,
    clockEl
  );
}
