import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";

import CarteraPage from "./pages/CarteraPage";
import HomePage from "./pages/HomePage";
import VisualizacionPage from "./pages/VisualizacionPage";
import EstadisticasPage from "./pages/EstadisticasPage";
import FondosPage from "./pages/FondosPage";
import FormulariosPage from "./pages/FormulariosPage";

// --- Componente principal de la aplicación
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveNavbarItem = () => {
    const currentPath = location.pathname;

    if (currentPath === "/") return "home";
    if (currentPath.startsWith("/visualizacion")) return "visualizacion";
    if (currentPath.startsWith("/cartera")) return "cartera";

    if (
      currentPath.startsWith("/estadisticas") ||
      currentPath.startsWith("/fondos") ||
      currentPath.startsWith("/formularios")
    ) {
      return "perfiles_proyecto";
    }

    return "home";
  };

  const activeNavbarItem = getActiveNavbarItem();

  const handleNavbarNavigation = (item) => {
    if (item === "home") navigate("/");
    else if (item === "visualizacion") navigate("/visualizacion");
    else if (item === "cartera") navigate("/cartera");
    else if (item === "estadisticas") navigate("/estadisticas");
    else if (item === "fondos") navigate("/fondos");
    else if (item === "formularios") navigate("/formularios");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Fijo */}
      <Navbar
        activeItem={activeNavbarItem}
        onNavItemClick={handleNavbarNavigation}
      />

      {/* Contenido Dinámico de la Página (ocupará el espacio restante) */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/visualizacion" element={<VisualizacionPage />} />
          <Route path="/cartera/*" element={<CarteraPage />} />
          <Route path="/estadisticas" element={<EstadisticasPage />} />
          <Route path="/fondos" element={<FondosPage />} />
          <Route path="/formularios" element={<FormulariosPage />} />

          <Route path="*" element={<div>Página no encontrada (404)</div>} />
        </Routes>
      </main>

      {/* Footer Fijo  */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
