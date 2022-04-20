import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchAPI from '../services/fetchStarWars';

const PlanetProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
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
  const [planetFilters, setPlanetFilters] = useState({
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  const [historyColumn, setHistoryColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const requestAPI = async () => {
    const responseFetchAPI = await fetchAPI();
    setData(responseFetchAPI);
  };

  return (
    <PlanetContext.Provider
      value={ {
        data,
        setData,
        filterData,
        setFilterData,
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
        requestAPI,
        historyColumn,
        setHistoryColumn,
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
