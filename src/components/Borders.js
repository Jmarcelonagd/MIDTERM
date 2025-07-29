import React from "react";

export default function Borders({ borders, onSelect, allCountries }) {
  if (!borders || borders.length === 0) return <p>No borders.</p>;

  // Map border codes to country names using allCountries
  const borderCountries = borders.map((code) => {
    const country = allCountries.find((c) => c.alpha3Code === code);
    return {
      code,
      name: country ? country.name : code,
    };
  });

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {borderCountries.map(({ code, name }) => (
        <button
          key={code}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() => onSelect(code)}
          title={name}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
