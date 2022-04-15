import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import './Table.css';

const Table = () => {
  const { data, planetName } = useContext(PlanetContext);
  const { filterByName: { name } } = planetName;
  console.log(name);

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
          {name.length === 0 && (
            data.map((planet, index) => (
              <tr
                key={ index }
              >
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
