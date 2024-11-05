import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountriesList.css';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const countriesPerPage = 10;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handleNextPage = () => {
    if (indexOfLastCountry < countries.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNavigate = (countryName) => {
    navigate(`/${countryName.toLowerCase()}`);
  };

  return (
    <div className="countries-list-container">
      <h1>Дэлхийн улсууд</h1>
      <ul className="countries-list">
        {currentCountries.map((country) => (
          <li key={country.cca3} className="country-item">
            <div className="country-info">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="country-flag"
              />
              <div className='text-section'>
              <h3 onClick={() => handleNavigate(country.name.common)} className="country-name">
                {country.name.common}
              </h3>
              <p>{country.population} хүн амтай</p>
              </div>
              <button onClick={() => handleNavigate(country.name.common)} className="expand-button">
                Дэлгэрэнгүй
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-button">
          Previous
        </button>
        <button onClick={handleNextPage} disabled={indexOfLastCountry >= countries.length} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default CountriesList;
