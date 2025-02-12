import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPokemonList, Pokemon } from '../services/pokeApi';
import './styles/search.css';
import ThemeSwitcher from '../components/ThemeSwitcher';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPokemon = async () => {
      if (query) {
        const allPokemon = await fetchPokemonList();
        const filtered = allPokemon.filter((pokemon) =>
          pokemon.name.includes(query.toLowerCase())
        );
        setResults(filtered);
      }
    };
    getPokemon();
  }, [query]);

  return (
    <div className="search-container">
      <ThemeSwitcher />
      <h1>Pesquisar Pokémon</h1>
      <input 
        type="text" 
        placeholder="Nome ou Número" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setQuery('')}>Limpar</button>
      
      <div className="table-wrapper">
        <table className="search-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {results.map((pokemon, index) => (
              <tr key={index}>
                <td>{pokemon.name}</td>
                <td>
                  <button onClick={() => navigate(`/details/${pokemon.name}`)}>
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchScreen;
