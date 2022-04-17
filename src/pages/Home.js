import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import Table from '../components/Table';

const Home = () => {
  const {
    setPlanetName,
    setPlanetFilters,
    setFilterColumn,
    setFilterComparison,
    setFilterValue,
    filterByNumericValues,
    filterColumn,
    filterComparison,
    filterValue,

  } = useContext(PlanetContext);

  const handleChange = ({ target }) => {
    setPlanetName({
      filterByName: { name: target.value },
    });
  };

  const changeColumn = ({ target }) => {
    setFilterColumn({
      column: target.value,
    });
  };

  const changeComparison = ({ target }) => {
    setFilterComparison({
      comparison: target.value,
    });
  };

  const changeValue = ({ target }) => {
    setFilterValue({
      value: target.value,
    });
  };

  const filterPlanets = () => {
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
        value={ filterByNumericValues }
        onChange={ changeColumn }
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
        value={ filterByNumericValues }
        onChange={ changeComparison }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ filterByNumericValues }
        onChange={ changeValue }
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
