/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
import Table from '../components/Table';

const Home = () => {
  const {
    requestAPI,
    setPlanetName,
    setPlanetFilters,
    setFilterColumn,
    setFilterComparison,
    setFilterValue,
    filterColumn,
    filterComparison,
    filterValue,
    setBtnFilter,
  } = useContext(PlanetContext);

  useEffect(() => {
    requestAPI();
  }, []);

  const handleChange = ({ target }) => {
    setBtnFilter({
      enable: false,
    });
    setPlanetName({
      filterByName: { name: target.value },
    });
  };

  const filterPlanets = () => {
    setBtnFilter({
      enable: true,
    });
    setPlanetFilters({
      filterByNumericValues: [
        {
          column: filterColumn.column,
          comparison: filterComparison.comparison,
          value: filterValue.value,
        },
      ],
    });
  };

  return (
    <section>
      <h1>Home</h1>
      <input
        type="text"
        data-testid="name-filter"
        name="name-filter"
        onChange={ handleChange }
      />

      <select
        data-testid="column-filter"
        name="column"
        value={ setFilterColumn.column }
        onChange={ ({ target }) => setFilterColumn({
          column: target.value,
        }) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ setFilterComparison.comparison }
        onChange={ ({ target }) => setFilterComparison({
          comparison: target.value,
        }) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ filterValue.value }
        onChange={ ({ target }) => setFilterValue({
          value: target.value,
        }) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterPlanets }
      >
        FILTRAR
      </button>

      <Table />
    </section>
  );
};

export default Home;
