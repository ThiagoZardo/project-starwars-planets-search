const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchAPI = async () => {
  const response = await fetch(URL);
  const { results } = await response.json();
  results.forEach((el) => delete el.residents);
  return results;
};

export default fetchAPI;
