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
    historyColumn,
    setHistoryColumn,
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
    setFilterColumn({
      column: historyColumn[0],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyColumn]);

  useEffect(() => {
    filterOnchange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, data]);

  useEffect(() => {
    requestAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ target }) => {
    setPlanetName({
      filterByName: { name: target.value },
    });
  };

  const filterPlanets = () => {
    // historyColumCopy.splice(historyColumCopy.indexOf(filterColumn.column), 1);

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

    setHistoryColumn(historyColumn.filter((el) => el !== filterColumn.column));

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

  // const historyFiltersComparisson = planetFilters.filterByNumericValues
  //   .filter((el) => el.comparison).map((el2) => el2.comparison);

  // const historyFiltersValue = planetFilters.filterByNumericValues
  //   .filter((el) => el.value).map((el2) => el2.value);

  const handleRemoveItem = ({ target }) => {
    target.remove();
  };

  return (
    <section>
      <h1>STAR WARS</h1>
      <input
        className="input_search"
        placeholder="Busque pelo nome do planeta..."
        type="text"
        data-testid="name-filter"
        name="name-filter"
        onChange={ handleChange }
      />

      <select
        data-testid="column-filter"
        className="input_column"
        name="column"
        value={ setFilterColumn.column }
        onChange={ ({ target }) => setFilterColumn({
          column: target.value,
        }) }
      >
        { historyColumn.map((el) => (
          <option
            key={ el }
          >
            { el }
          </option>
        )) }
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        className="input_comparison"
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
        className="input_value"
        name="value"
        value={ filterValue.value }
        onChange={ ({ target }) => setFilterValue({
          value: target.value,
        }) }
      />

      <button
        type="button"
        className="btn_filter"
        data-testid="button-filter"
        onClick={ filterPlanets }
      >
        FILTRAR
      </button>
      {
        historyFiltersColumns.map((elColumn, index) => (
          // A sintaxe abaixo do span foi tirada da doc do es-lint
          <span
            className="history_search"
            key={ index }
            onClick={ handleRemoveItem }
            onKeyPress={ handleRemoveItem }
            role="button"
            tabIndex="0"
          >
            { elColumn }
            { ' ' }
            x
          </span>
        ))
      }

      <Table />

    </section>
  );
};

export default Home;
