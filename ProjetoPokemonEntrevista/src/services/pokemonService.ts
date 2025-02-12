export const fetchPokemonDetails = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar detalhes do Pokémon');
  }
  return await response.json();
};
