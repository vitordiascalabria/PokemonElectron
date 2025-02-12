import { useNavigate } from 'react-router-dom';
import './styles/Initial.css';
import ThemeSwitcher from '../components/ThemeSwitcher';


const InitialScreen = () => {
  const navigate = useNavigate();

  return (
    <div className={"initial-container"}>
      <ThemeSwitcher />
      <h1>Bem-vindo ao Pokedex App</h1>
      <button onClick={() => navigate('/search')}>Ir para Pesquisa</button>
    </div>
  );
};

export default InitialScreen;