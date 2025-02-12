import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { fetchPokemonDetails } from '../services/pokemonService';
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
  species: { name: string };
  evolves_to: EvolutionChain[];
}

const typeColors: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

const DetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionDetails[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const loadPokemonDetails = async () => {
      if (!id) return;
      try {
        const data = await fetchPokemonDetails(id);
        setPokemon(data);
        
        // Buscar evoluções
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        const extractEvolutions = async (chain: EvolutionChain, evolutions: EvolutionDetails[] = []) => {
          if (!chain) return evolutions;
          const speciesName = chain.species.name;
          const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesName}`);
          const pokemonData = await pokemonResponse.json();
          evolutions.push({ name: speciesName, sprite: pokemonData.sprites.front_default });
          for (const evo of chain.evolves_to) {
            await extractEvolutions(evo, evolutions);
          }
          return evolutions;
        };

        if (evolutionData.chain) {
          let evolutions = await extractEvolutions(evolutionData.chain, []);
          evolutions = evolutions.filter(evo => evo.name !== data.name);
          setEvolutionChain(evolutions);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error);
      }
    };
    loadPokemonDetails();
  }, [id]);

  if (!pokemon) {
    return <p className="loading">Carregando...</p>;
  }

  return (
    <div className={`details-container ${theme}-theme`} style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      <ThemeSwitcher />
      <div className="left-column card">
        <h1>{pokemon.name.toUpperCase()} (#{pokemon.id})</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
      </div>
      <div className="right-column card">
        <h2>Tipos</h2>
        <div className="type-container">
          {pokemon.types.map((t, index) => (
            <div
              key={index}
              className="type-box"
              style={{ backgroundColor: typeColors[t.type.name] || '#777', color: '#fff' }}
            >
              {t.type.name.toUpperCase()}
            </div>
          ))}
        </div>
        <h2>Evoluções</h2>
        <div className="evolution-container">
          {evolutionChain.length > 0 ? (
            evolutionChain.map((evo, index) => (
              <div key={index} className="evolution-card" onClick={() => navigate(`/details/${evo.name}`)}>
                <img src={evo.sprite} alt={evo.name} className="evolution-image" />
                <p>{evo.name.toUpperCase()}</p>
              </div>
            ))
          ) : (
            <p>Sem evoluções</p>
          )}
        </div>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    </div>
  );
};

export default DetailsScreen;
