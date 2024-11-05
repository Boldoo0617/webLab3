import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CountryDetails.css';

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();  // Use useNavigate for navigation

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountry();
  }, [countryName]);

  if (!country) return <div>Loading...</div>;

  return (
    <div className="country-details-container">
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag-large" />
      <p><strong>Тив:</strong> {country.region}</p>
      <p><strong>Хүн ам:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Нийслэл:</strong> {country.capital?.[0]}</p>
      <p><strong>Газар нутаг:</strong> {country.area.toLocaleString()} km²</p>
      <button onClick={() => navigate('/')} className="return-button">Буцах</button>
    </div>
  );
};

export default CountryDetails;
