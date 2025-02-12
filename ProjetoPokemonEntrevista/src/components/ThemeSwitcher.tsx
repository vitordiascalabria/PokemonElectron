import { useTheme } from '../context/ThemeContext';
import './styles/themeSwitcher.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeSwitcher;
