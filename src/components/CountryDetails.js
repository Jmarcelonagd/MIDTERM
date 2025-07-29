function CountryDetails({ country }) {
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((curr) => curr.name)
        .join(", ")
    : "N/A";

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md transition-colors duration-300 border border-gray-300 dark:border-gray-700">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={country.flags?.png || country.flags?.svg}
          alt={`${country.name?.common} flag`}
          className="w-64 h-40 object-cover rounded border"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{country.name?.common}</h2>
          <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
          <p><strong>Region:</strong> {country.region || "N/A"}</p>
          <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
          <p><strong>Population:</strong> {country.population?.toLocaleString() || "N/A"}</p>
          <p><strong>Area:</strong> {country.area?.toLocaleString() || "N/A"} km²</p>
          <p><strong>Coordinates:</strong> {country.latlng?.join(", ") || "N/A"}</p>
          <p><strong>Timezones:</strong> {country.timezones?.join(", ") || "N/A"}</p>
          <p><strong>Languages:</strong> {languages}</p>
          <p><strong>Currencies:</strong> {currencies}</p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
