import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './styles/details.css';

interface PokemonDetails {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  species: { url: string };
}

interface EvolutionDetails {
  name: string;
  sprite: string;
}

interface EvolutionChain {
  species: { name: string; url: string };
  evolves_to: EvolutionChain[];
}

const DetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionDetails[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const extractEvolutions = async (chain: EvolutionChain, evolutions: EvolutionDetails[] = []) => {
          if (!chain) return evolutions;
          if (!evolutions.some(evo => evo.name === chain.species.name)) {
            const speciesName = chain.species.name;
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesName}`);
            const pokemonData = await pokemonResponse.json();
            evolutions.push({ name: speciesName, sprite: pokemonData.sprites.front_default });
          }
          for (const evo of chain.evolves_to) {
            await extractEvolutions(evo, evolutions);
          }
          return evolutions;
        };

        if (evolutionData.chain) {
          let evolutions = await extractEvolutions(evolutionData.chain, []);
          evolutions = evolutions.filter(evo => evo.name !== data.name); // Remove o próprio Pokémon da lista
          setEvolutionChain(evolutions);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={`details-container ${theme}-theme`}>
      <div className="left-column">
        <h1>{pokemon.name} (#{pokemon.id})</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>
      </div>
      <div className="right-column">
        <h2>Tipos</h2>
        <ul>
          {pokemon.types.map((t, index) => (
            <li key={index}>{t.type.name}</li>
          ))}
        </ul>
      </div>
      <div className='evolution-column'><h2>Evoluções</h2>
      <div className="evolution-container">
        
          {evolutionChain.length > 0 ? (
            evolutionChain.map((evo, index) => (
              <div key={index} className="evolution-card" onClick={() => navigate(`/details/${evo.name}`)}>
                <img src={evo.sprite} alt={evo.name} />
                <p>{evo.name}</p>
              </div>
            ))
          ) : (
            <p>Sem evoluções</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;
