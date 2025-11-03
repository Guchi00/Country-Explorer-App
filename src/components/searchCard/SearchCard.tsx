import React, { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type { Country } from "../../pages/Home";
import "./SearchCard.css";

interface SearchCardProps {
  data: Country[];
}
export const SearchCard = ({ data }: SearchCardProps) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setQuery(userInput);
  };

  // console.log(countryData);

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
        {data.slice(0, 2).map((country) => (
          <div className="data_items" key={country.name.common}>
            <Link to="">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
              />
              <h5>{country.name.common}</h5>
            </Link>
          </div>
        ))}
      </form>
    </div>
  );
};
