import { useState, useEffect } from "react";
import { CountrySearch } from "../components/countrySearch/CountrySearch";

export interface Countrry {
  name: { common: string };
  flags: { svg: string; png: string };
  capital?: string[];
  population?: number;
  language?: string;
  region?: string;
  subregion?: string;
  borders?: string[];
  languages?: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
  timezones?: string[];
}

export const Home = () => {
  const [countries, setCountries] = useState<Countrry[]>([]);

  const getCountries = async () => {
    const storedCountries = localStorage.getItem("countries");
    if (storedCountries) {
      try {
        const parsedCountries = JSON.parse(storedCountries);
        setCountries(parsedCountries);
        return;
      } catch (error) {
        console.log("Cache corrupted, loading fresh data");
      }
    }
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
      localStorage.setItem("countries", JSON.stringify(sortedData));
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  console.log(countries);

  return (
    <div>
      <CountrySearch data={countries} />
    </div>
  );
};
