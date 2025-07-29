import React from "react";

export default function Borders({ borders, onSelect, allCountries }) {
  console.log("Borders component props:", { borders, allCountries });

  if (!borders || borders.length === 0) return <p>No borders.</p>;

  // Map border codes to country names using allCountries
  const borderCountries = borders.map((code) => {
    const country = allCountries.find((c) => c.cca3 === code);
    return {
      code,
      name: country ? country.name.common : code,
    };
  });

  return (
    <div className="flex flex-nowrap gap-2 mt-2 max-w-full overflow-x-auto">
      {borderCountries.map(({ code, name }) => (
        <button
          key={code}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 whitespace-nowrap min-w-max"
          onClick={() => onSelect(code)}
          title={name}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
