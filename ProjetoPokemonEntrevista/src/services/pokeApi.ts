export interface Pokemon {
    name: string;
    url: string;
  }
  
  export const fetchPokemonList = async (): Promise<Pokemon[]> => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      return data.results as Pokemon[];
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
      return [];
    }
  };
  