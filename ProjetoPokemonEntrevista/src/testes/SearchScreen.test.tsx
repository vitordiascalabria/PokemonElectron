import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; 
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import SearchScreen from "../pages/SearchScreen";

describe("SearchScreen", () => {
  it("permite buscar um Pokémon por nome", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25" }
        ]
      })
    );

    render(
      <ThemeProvider>
        <MemoryRouter>
          <SearchScreen />
        </MemoryRouter>
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText("Buscar por nome");
    
    // Uso correto do userEvent
    await userEvent.type(input, "pikachu");

    await waitFor(() => {
      expect(input).toHaveValue("pikachu");
    });
  });
});
