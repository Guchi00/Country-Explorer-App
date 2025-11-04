import React, { useState, useEffect } from "react";
import { CountrySearch } from "../components/countrySearch/CountrySearch";

export interface Country {
  name: { common: string };
  flags: { svg: string; png: string };
}

export const Home = () => {
  const [countryData, setCountryData] = useState<Country[]>([]);

  const getCountry = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/all?fields=name,flags`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch country data");
      }
      const data = await response.json();
      const sortedData = data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountryData(sortedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  console.log(countryData);

  return (
    <div>
      <CountrySearch data={countryData} />
    </div>
  );
};
