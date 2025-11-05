import React, { useState, useEffect } from "react";
import { CountrySearch } from "../components/countrySearch/CountrySearch";

export interface Countrry {
  name: { common: string };
  flags: { svg: string; png: string };
}

export const Home = () => {
  const [countries, setCountries] = useState<Countrry[]>([]);

  const getCountry = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/all?fields=name,flags`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch country data");
      }
      const data = await response.json();
      const sortedData = data.sort((a: Countrry, b: Countrry) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  console.log(setCountries);

  return (
    <div>
      <CountrySearch data={countries} />
    </div>
  );
};
