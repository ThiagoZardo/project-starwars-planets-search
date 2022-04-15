import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import Table from '../components/Table';

const Home = () => {
  const { setPlanetName } = useContext(PlanetContext);

  const handleChange = ({ target }) => {
    setPlanetName({
      filterByName: { name: target.value },
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
      <Table />
    </section>
  );
};

export default Home;
