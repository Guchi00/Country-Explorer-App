import { useEffect, useState } from "react";
import { CountryDetails } from "../components/countryDetails/CountryDetails";
import { useParams } from "react-router-dom";
import type { Countrry } from "./Home";

export const Country = () => {
  const [country, setCountry] = useState<Countrry | null>(null);
  const { countryName } = useParams();

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.log(`${error}`);
      }
    };
    getCountry();
  }, [countryName]);

  if (!country) return <div>Loading..</div>;

  return (
    <div>
      <CountryDetails country={country} />
    </div>
  );
};
