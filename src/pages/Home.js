import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "../components/CountryDetails";
import Borders from "../components/Borders";
import CountriesList from "../components/CountriesList";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        setAllCountries(res.data);
        console.log("Available regions:", [...new Set(res.data.map(c => c.region))]);
      } catch (err) {
        console.error("Failed to fetch all countries on mount", err);
      }
    };
    fetchAllCountries();
  }, []);

  const handleSearch = async () => {
    const query = searchTerm.trim();
    setLoading(true);
    try {
      let filtered = [];

      if (query) {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
        filtered = res.data;
        console.log("API search results for query:", query, filtered.map(c => c.name.common));
        // Client-side filter to only include countries starting with search term
        filtered = filtered.filter(c => c.name.common.toLowerCase().startsWith(query.toLowerCase()));
      } else {
        filtered = allCountries;
      }

      if (regionFilter) {
        filtered = filtered.filter((c) => c.region && c.region.trim().toLowerCase() === regionFilter.trim().toLowerCase());
      }

      if (filtered.length > 0) {
        setCountriesList(filtered);
        setCountryData(null);
        setError("");
      } else {
        setCountryData(null);
        setCountriesList([]);
        setError("Country not found with selected filters.");
      }
    } catch (err) {
      setError("Country not found.");
      setCountryData(null);
      setCountriesList([]);
    }
    setLoading(false);
  };

  const handleBorderSelect = async (code) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      console.log("Fetched border country data:", res.data[0]);
      setCountryData(res.data[0]);
      setError("");
    } catch (err) {
      setError("Failed to fetch border country details.");
    }
    setLoading(false);
  };

  const handleCountrySelect = (country) => {
    setCountryData(country);
    setCountriesList([]);
    setError("");
  };

  // Apply region filter by default when search is empty
  useEffect(() => {
    if (!searchTerm && regionFilter && allCountries.length > 0) {
      const filtered = allCountries.filter((c) => c.region === regionFilter);
      if (filtered.length > 0) {
        setCountriesList(filtered);
        setCountryData(null);
        setError("");
      } else {
        setCountriesList([]);
        setCountryData(null);
        setError("Country not found with selected filters.");
      }
    }
  }, [regionFilter, searchTerm, allCountries]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500 ease-in-out p-6">
      <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Country Finder</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 border rounded hover:bg-blue-500 dark:hover:bg-blue-700 transition-all duration-300"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for a country..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 
                     bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-300"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Polar">Polar</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition-transform duration-200"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {countryData && (
        <div className="max-w-3xl mx-auto animate-fade-in">
          {console.log("Rendering CountryDetails with borders:", countryData.borders, "and allCountries length:", allCountries.length)}
          <CountryDetails 
            country={countryData} 
            borders={countryData.borders} 
            onSelect={handleBorderSelect} 
            allCountries={allCountries} 
          />
        </div>
      )}
      {countriesList.length > 0 && (
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h3 className="mt-4 font-semibold">Countries List:</h3>
          <CountriesList 
            countries={countriesList} 
            onSelectCountry={handleCountrySelect} 
            allCountries={allCountries} 
          />
        </div>
      )}
    </div>
  );
}

export default Home;
