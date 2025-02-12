import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './styles/search.css';
import ThemeSwitcher from '../components/ThemeSwitcher';

interface Pokemon {
  name: string;
  id: number;
  types: { type: { name: string } }[];
}

const typesList = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const detailsResponse = await fetch(pokemon.url);
            return await detailsResponse.json();
          })
        );
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.types.some(t => t.type.name === selectedType) : true;
    return matchesName && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  return (
    <div className={`search-container ${theme}-theme`}>
      <ThemeSwitcher />
      <h1>Pesquisar Pokémon</h1>
      <input
        type="text"
        placeholder="Buscar por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
        <option value="">Todos os tipos</option>
        {typesList.map(type => (
          <option key={type} value={type}>{type.toUpperCase()}</option>
        ))}
      </select>
      {currentItems.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(pokemon => (
                <tr key={pokemon.id}>
                  <td>{pokemon.name.toUpperCase()}</td>
                  <td>
                    <button onClick={() => navigate(`/details/${pokemon.id}`)}>Ver Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchScreen;
