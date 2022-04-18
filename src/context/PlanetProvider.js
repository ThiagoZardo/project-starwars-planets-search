import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

const PlanetProvider = ({ children }) => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
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

  useEffect(() => {
    const getPlanetApi = async () => {
      try {
        const request = await fetch(URL);
        const { results } = await request.json();
        results.forEach((el) => delete el.residents);
        setData(results);
        return results;
      } catch (error) {
        return error;
      }
    };
    getPlanetApi();
  }, []);

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
