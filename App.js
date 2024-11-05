import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountriesList from './CountriesList';
import CountryDetails from './CountryDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CountriesList />} />
      <Route path="/:countryName" element={<CountryDetails />} />
    </Routes>
  </Router>
);

export default App;
