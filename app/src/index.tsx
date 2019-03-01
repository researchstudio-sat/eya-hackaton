/**
 * created by MS 01.03.2019
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "semantic-ui-react";

/*
ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById("example")
);*/

const ButtonExampleButton = () => <Button>Click Here</Button>;

const main = document.getElementById("main");
if (main) {
  ReactDOM.render(ButtonExampleButton(), main);
}
