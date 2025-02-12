import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";

describe("ThemeSwitcher", () => {
  it("alterna entre os temas quando clicado", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    const toggleSwitch = screen.getByRole("checkbox");

    expect(toggleSwitch).not.toBeChecked();

    await userEvent.click(toggleSwitch);

    expect(toggleSwitch).toBeChecked();
  });
});
