import React from "react";
import Fun from "./Fun";

export function App() {
  const title = () =>  <h1>this is my title</h1>;
  console.log("hyy");
  return (
    <div>
      <Fun />
        {title()}
      <h1>Hello React!</h1>
    </div>
  );
}
