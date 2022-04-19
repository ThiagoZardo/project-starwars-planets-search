/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
import Table from '../components/Table';
import './Home.css';

const Home = () => {
  const {
    data,
    // filterData,
    setFilterData,
    planetName,
    requestAPI,
    setPlanetName,
    planetFilters,
    setPlanetFilters,
    setFilterColumn,
    setFilterComparison,
    setFilterValue,
    filterColumn,
    filterComparison,
    filterValue,
  } = useContext(PlanetContext);

  const { filterByName: { name } } = planetName;
  // const { filterByNumericValues: [{ column, comparison, value }] } = planetFilters;

  // Filtra por textos digitados
  const filterOnchange = () => {
    if (name === '') {
      return setFilterData(data);
    }
    if (name) {
      return setFilterData(data.filter((el) => el.name.toLowerCase()
        .includes(name.toLowerCase())));
    }
  };

  useEffect(() => {
    filterOnchange();
  }, [name, data]);

  useEffect(() => {
    requestAPI();
  }, []);

  const handleChange = ({ target }) => {
    setPlanetName({
      filterByName: { name: target.value },
    });
  };

  const filterPlanets = () => {
    setPlanetFilters((prevState) => ({
      filterByNumericValues: [
        ...prevState.filterByNumericValues,
        {
          column: filterColumn.column,
          comparison: filterComparison.comparison,
          value: filterValue.value,
        },
      ],
    }));

    if (filterColumn.column && filterComparison.comparison === 'igual a') {
      return setFilterData((prevState) => (prevState
        .filter((el) => el[filterColumn.column] === filterValue.value)));
    }
    if (filterColumn.column && filterComparison.comparison === 'menor que') {
      return setFilterData((prevState) => (prevState
        .filter((el) => el[filterColumn.column] < Number(filterValue.value))));
    }
    if (filterColumn.column && filterComparison.comparison === 'maior que') {
      return setFilterData((prevState) => (prevState
        .filter((el) => el[filterColumn.column] > Number(filterValue.value))));
    }
  };

  const historyFiltersColumns = planetFilters.filterByNumericValues
    .filter((el) => el.column).map((el2) => el2.column);

  const historyFiltersComparisson = planetFilters.filterByNumericValues
    .filter((el) => el.comparison).map((el2) => el2.comparison);

  const historyFiltersValue = planetFilters.filterByNumericValues
    .filter((el) => el.value).map((el2) => el2.value);

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
        {/* {
          const historyFiltersColumns = planetFilters.filterByNumericValues
            .filter((el) => Object.values(el.column))
        } */}
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
      {
        historyFiltersColumns.map((elColumn, index) => (
          historyFiltersComparisson.map((elComparisson) => (
            historyFiltersValue.map((elValue) => (
              <>
                <span
                  key={ index }
                >
                  { elColumn }
                  { elComparisson }
                  { elValue }
                </span>
                <button
                  className="btnClose"
                  type="button"
                >
                  X
                </button>
              </>
            ))
          ))
        ))
      }

      <Table />

    </section>
  );
};

export default Home;
