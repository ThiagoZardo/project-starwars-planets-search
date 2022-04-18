import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import './Table.css';

const Table = () => {
  const { data, planetName, planetFilters } = useContext(PlanetContext);
  const { filterByName: { name } } = planetName;
  const { filterByNumericValues: [{ column, comparison, value }] } = planetFilters;

  let dataPlanets = data;
  if (name) {
    dataPlanets = data.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (column !== '' && comparison === 'maior que') {
    dataPlanets = data.filter((el) => el[column] > Number(value));
  } else if (column && comparison === 'menor que') {
    dataPlanets = data.filter((el) => el[column] < Number(value));
  } else if (column && comparison === 'igual a') {
    dataPlanets = data.filter((el) => el[column] === value);
  }

  return (
    <>
      <h1>Tabela</h1>

      <table className="table-container">
        <tbody>
          <tr className="column">
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>

          {
            dataPlanets.map((element, index) => (
              <tr
                key={ index }
              >
                <td>{element.name}</td>
                <td>{element.rotation_period}</td>
                <td>{element.orbital_period}</td>
                <td>{element.diameter}</td>
                <td>{element.climate}</td>
                <td>{element.gravity}</td>
                <td>{element.terrain}</td>
                <td>{element.surface_water}</td>
                <td>{element.population}</td>
                <td>{element.films}</td>
                <td>{element.created}</td>
                <td>{element.edited}</td>
                <td>{element.url}</td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </>
  );
};

export default Table;
