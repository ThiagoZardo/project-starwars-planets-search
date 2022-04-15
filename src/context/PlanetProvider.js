import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

const PlanetProvider = ({ children }) => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [data, setData] = useState([]);
  const [planetName, setPlanetName] = useState({ filterByName: { name: '' } });

  useEffect(() => {
    const getPlanetApi = async () => {
      try {
        const request = await fetch(URL);
        const { results } = await request.json();
        setData(results);
        return results;
      } catch (error) {
        return error;
      }
    };
    getPlanetApi();
  }, []);

  // Atualiza o estado
  // const atualizeState = (newState) => {
  //   setData((prevState) => [
  //     ...prevState,
  //     newState,
  //   ]);
  // };

  return (
    <PlanetContext.Provider value={ { data, setData, planetName, setPlanetName } }>
      { children }
    </PlanetContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default PlanetProvider;
