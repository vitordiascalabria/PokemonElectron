import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialScreen from "./pages/InitialScreen";
import SearchScreen from "./pages/SearchScreen";
import DetailsScreen from "./pages/DetailsScreen";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/details/:id" element={<DetailsScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
