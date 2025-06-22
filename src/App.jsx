// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";

// Importa tus componentes de página nuevos y existentes
import HomePage from "./pages/HomePage";
import VisualizacionPage from "./pages/VisualizacionPage";
import EstadisticasPage from "./pages/EstadisticasPage";
import FondosPage from "./pages/FondosPage";
import FormulariosPage from "./pages/FormulariosPage";
import AnadirProyectosPage from "./pages/AnadirProyectosPage"; // ¡Atención al nombre de archivo!
import EditarProyectosPage from "./pages/EditarProyectosPage"; // ¡Atención al nombre de archivo!

// --- Componente principal de la aplicación
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para determinar qué elemento del Navbar está activo
  const getActiveNavbarItem = () => {
    const currentPath = location.pathname;

    if (currentPath === "/") return "home";
    if (currentPath.startsWith("/visualizacion")) return "visualizacion";

    // Modificado: Cartera de proyectos ahora activa con sus sub-rutas
    if (
      currentPath.startsWith("/anadir-proyectos") ||
      currentPath.startsWith("/editar-proyectos")
    ) {
      return "cartera_proyectos"; // Un nuevo identificador para el menú de cartera
    }

    // Perfiles de proyecto sigue como antes con sus sub-rutas
    if (
      currentPath.startsWith("/estadisticas") ||
      currentPath.startsWith("/fondos") ||
      currentPath.startsWith("/formularios")
    ) {
      return "perfiles_proyecto";
    }

    return "home"; // Valor por defecto si no coincide con nada
  };

  const activeNavbarItem = getActiveNavbarItem();

  // Función para manejar la navegación desde el Navbar
  const handleNavbarNavigation = (item) => {
    switch (item) {
      case "home":
        navigate("/");
        break;
      case "visualizacion":
        navigate("/visualizacion");
        break;
      // Modificado: Ahora el Navbar llamará directamente a las rutas de las páginas
      case "anadir-proyectos": // Nuevo caso
        navigate("/anadir-proyectos");
        break;
      case "editar-proyectos": // Nuevo caso
        navigate("/editar-proyectos");
        break;
      case "estadisticas":
        navigate("/estadisticas");
        break;
      case "fondos":
        navigate("/fondos");
        break;
      case "formularios":
        navigate("/formularios");
        break;
      default:
        navigate("/"); // Fallback a Home
    }
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

          {/* Nuevas rutas directas para las páginas de Cartera */}
          <Route path="/anadir-proyectos" element={<AnadirProyectosPage />} />
          <Route path="/editar-proyectos" element={<EditarProyectosPage />} />

          <Route path="/estadisticas" element={<EstadisticasPage />} />
          <Route path="/fondos" element={<FondosPage />} />
          <Route path="/formularios" element={<FormulariosPage />} />

          {/* Ruta 404 para cualquier otra URL */}
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