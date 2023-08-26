import React, { useState, useEffect } from "react";
import Header from "./Header";
import Card from "./Card";

export function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setData(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <div className="card">

      {data.map((character) => {
        return (
          <Card character={character} />
          );
        })}
        </div>
    </>
  );
}
