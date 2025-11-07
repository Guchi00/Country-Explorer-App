import "./CountryDetails.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { Countrry } from "../../pages/Home";
import { useEffect, useState } from "react";

interface CountryDetailsProps {
  country: Countrry | null;
}

interface CountryBorder {
  name: { common: string };
  cca3: string;
}

export const CountryDetails = ({ country }: CountryDetailsProps) => {
  const [countryBorders, setCountryBorders] = useState<CountryBorder[]>([]);
  console.log(country);

  useEffect(() => {
    const getCountryBorders = async () => {
      try {
        const codes = country?.borders?.join(",");
        if (country?.borders && country.borders.length > 0) {
          const response = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${codes}`
          );
          if (!response.ok) {
            throw new Error("Unable to fetch");
          }
          const borders = await response.json();
          setCountryBorders(borders);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCountryBorders();
  }, [country?.borders]);

  return (
    <div className="container">
      <Link to={`/`} className="header">
        <ArrowLeftOutlined />
        <h4>back to home page</h4>
      </Link>
      <div className="flag_and_countryname">
        <img src={country?.flags.svg} />
        <h1>{country?.name.common}</h1>
      </div>
      <div className="country_details">
        <h5>Region</h5>
        <h5>{country?.region}</h5>
      </div>
      <div className="country_details">
        <h5>Capital</h5>
        <h5>{country?.capital}</h5>
      </div>
      <div className="country_details">
        <h5>Population</h5>
        <h5>{country?.population}</h5>
      </div>

      {country?.languages && (
        <div className="country_details">
          <h5>Language</h5>
          <h5>{Object.values(country?.languages).join(", ")}</h5>
        </div>
      )}

      {country?.currencies && (
        <div className="country_details">
          <h5>Currency</h5>
          <h5>
            {Object.values(country.currencies)
              .map((curr) => `${curr.name} (${curr.symbol})`)
              .join(", ")}
          </h5>
        </div>
      )}

      <div className="country_details">
        <h5>Time Zone</h5>
        <h5>{country?.timezones}</h5>
      </div>

      {country?.borders && country.borders.length > 0 && (
        <div className="borders">
          <h1>Borders</h1>
          <div className="countries">
            {countryBorders?.map((countryBorder) => (
              <Link
                to={`/country/${countryBorder.name.common}`}
                className="country"
                key={countryBorder.cca3}
              >
                {countryBorder.name.common}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
