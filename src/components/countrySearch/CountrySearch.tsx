import React, { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type { Countrry } from "../../pages/Home";
import "./CountrySearch.css";

interface SearchCardProps {
  data: Countrry[];
}
export const CountrySearch = ({ data }: SearchCardProps) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setQuery(userInput);
  };

  const filteredCountryData =
    query === ""
      ? data
      : data.filter((country) => country.name.common.includes(query));

  return (
    <div className="searchCard">
      <form>
        <h1>
          Country <br></br>Explorer
        </h1>
        <input
          className="user_input"
          placeholder="Search for a country"
          type="text"
          value={query}
          onChange={handleChange}
        />
        <div className="data_container">
          {filteredCountryData.map((country) => (
            <Link
              to={`/country/${country.name.common}`}
              key={country.name.common}
              className="data_items"
            >
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
              />
              <h4>{country.name.common}</h4>
            </Link>
          ))}
        </div>
      </form>
    </div>
  );
};
