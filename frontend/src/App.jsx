import "./App.css";
import Hero from "./sections/Hero/Hero";
import { useState } from "react";

function App() {
  const [humans, setHumans] = useState([{ name: "unknown", age: 0 }]);

  function writeHumans() {
    let allElements = humans.map((n) => (
      <li key={n.age}>
        <span>
          <b>{n.name}</b>
        </span>
        <span>{n.age}</span>
      </li>
    ));
    return allElements;
  }

  function loadHumans() {
    fetch("/humans")
      .then((res) => {
        return res.json();
      })
      .then((val) => {
        setHumans(val);
      });
  }

  return (
    <>
      <Hero />
      <h1>Humans</h1>
      <ul>{writeHumans()}</ul>
    </>
  );
}

export default App;
