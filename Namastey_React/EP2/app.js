import React, { useState, useEffect } from "react";
import Header from "./Header";
import Card from "./Card";
import { API_URL } from "./config";

const filterData = (text, data) => {
  return data.filter((char) =>
    char.name.toLowerCase().includes(text.toLowerCase())
  );
};

export function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onOptionChangeHandler = (event) => {
    let val = event.target.value.toLowerCase();
    console.log("User Selected Value - ", event.target.value);
    if (val !== "") {
      const updatedData = data.filter((char) =>
        char.status.toLowerCase().includes(val)
      );
      setData(updatedData);
    }
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("useEffect called");
        setData(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log("render")
  return (
    <>
      <Header />
      <div className="search">
        <input
          type="text"
          placeholder="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);

            console.log(searchText);
          }}
        />
        <button
          onClick={() => {
            if (searchText.length !== 0) {
              const filteredData = filterData(searchText, data);
              setData(filteredData);
            }
          }}
        >
          Search
        </button>
      </div>
      <div className="select">
        <select name="character" id="char" onChange={onOptionChangeHandler}>
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="dead">Dead</option>
        </select>
      </div>
      <div className="card">
        {console.log(data)}
        {data.map((character) => {
          return <Card key={character.name} character={character} />;
        })}
      </div>
    </>
  );
}
