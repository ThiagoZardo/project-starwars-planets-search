import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchAPI from '../services/fetchStarWars';

const PlanetProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [planetName, setPlanetName] = useState({ filterByName: { name: '' } });
  const [filterColumn, setFilterColumn] = useState({
    column: 'population',
  });
  const [filterComparison, setFilterComparison] = useState({
    comparison: 'maior que',
  });
  const [filterValue, setFilterValue] = useState({
    value: 0,
  });
  const [btnFilter, setBtnFilter] = useState({
    enable: false,
  });
  const [planetFilters, setPlanetFilters] = useState({
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: 0,
      },
    ],
  });

  const requestAPI = async () => {
    const responseFetchAPI = await fetchAPI();
    setData(responseFetchAPI);
  };

  return (
    <PlanetContext.Provider
      value={ {
        data,
        setData,
        planetName,
        setPlanetName,
        planetFilters,
        setPlanetFilters,
        filterColumn,
        setFilterColumn,
        filterComparison,
        setFilterComparison,
        filterValue,
        setFilterValue,
        btnFilter,
        setBtnFilter,
        requestAPI,
      } }
    >
      { children }
    </PlanetContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default PlanetProvider;
