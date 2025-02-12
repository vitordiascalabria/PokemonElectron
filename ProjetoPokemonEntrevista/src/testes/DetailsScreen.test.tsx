import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import DetailsScreen from "../pages/DetailsScreen";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("DetailsScreen", () => {
  it(
    "exibe os detalhes do Pokémon",
    async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          name: "pikachu",
          id: 25,
          height: 4,
          weight: 60,
          sprites: { front_default: "https://example.com/pikachu.png" },
          types: [{ type: { name: "electric" } }],
          species: { url: "https://pokeapi.co/api/v2/pokemon-species/25/" },
        })
      );

      render(
        <ThemeProvider>
          <MemoryRouter>
            <DetailsScreen />
          </MemoryRouter>
        </ThemeProvider>
      );

      // Aguarda que a API tenha sido chamada
      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1), { timeout: 10000 });

      // Aguarda até que o nome do Pokémon apareça
      await waitFor(
        () => expect(screen.getByText(/pikachu/i)).toBeInTheDocument(),
        { timeout: 10000 }
      );

      // Verifica as informações do Pokémon
      expect(screen.getByText(/altura: 0.4 m/i)).toBeInTheDocument();
      expect(screen.getByText(/peso: 6 kg/i)).toBeInTheDocument();
    },
    15000 // Aumentando timeout total do teste para 15 segundos
  );
});
