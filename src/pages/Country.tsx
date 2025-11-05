import React, { useState } from "react";
import { CountryDetails } from "../components/countryDetails/CountryDetails";
import { type Countrry } from "./Home";

export const Country = () => {
  const [country, setCountry] = useState();

  // const getCountry = async() => {
  //   try {
  //     const response = await fetch (``)
  //   }
  // }

  return (
    <div>
      <CountryDetails />
    </div>
  );
};
