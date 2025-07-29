import React from "react";
import CountryDetails from "./CountryDetails";

const CountriesList = ({ countries }) => {
  if (!countries || countries.length === 0) {
    return <p className="text-center">No countries to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
      {countries.map((country, index) => (
        <div key={index} className="p-4 border rounded-md bg-white dark:bg-gray-800 shadow">
          <CountryDetails country={country} />
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
