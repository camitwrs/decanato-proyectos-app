import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3,
  Home,
  FileText,
  User,
  ChevronDown,
  BarChart,
  DollarSign,
  ClipboardList,
} from "lucide-react";

// Asumo que querrás manejar la navegación en el componente padre
// o pasar un prop `onNavigate` para cambiar el estado `currentView`.
// Por ahora, solo simularé el click.

// Prop `activeItem` para saber qué botón del navbar debe estar activo
// Prop `onNavItemClick` para manejar la navegación desde el componente padre
export default function Navbar({ activeItem = "cartera", onNavItemClick }) {
  return (
    <header className="bg-[#2E5C8A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Logo y Título de la Aplicación */}
            <div
              className="flex items-center space-x-2 group cursor-pointer" // <-- AQUÍ SE AGREGA
              onClick={() => onNavItemClick("home")}
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#2E5C8A]" />
              </div>
              <div className="text-white font-bold text-lg">
                Formulación de Proyectos I+D
              </div>
            </div>

            {/* Navegación Principal */}
            <nav className="hidden md:flex space-x-6">
              <Button
                variant="ghost"
                className={`text-white cursor-pointer hover:bg-white/10 hover:text-white ${
                  activeItem === "home" ? "bg-white/10" : ""
                }`}
                onClick={() => onNavItemClick("home")}
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
              <Button
                variant="ghost"
                className={`text-white cursor-pointer hover:bg-white/10 hover:text-white ${
                  activeItem === "visualizacion" ? "bg-white/10" : ""
                }`}
                onClick={() => onNavItemClick("visualizacion")}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Visualización
              </Button>
              <Button
                variant="ghost"
                className={`text-white cursor-pointer hover:bg-white/10 hover:text-white ${
                  activeItem === "cartera" ? "bg-white/10" : ""
                }`}
                onClick={() => onNavItemClick("cartera")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Cartera de proyectos
              </Button>

              {/* Dropdown para "Perfiles de proyecto" */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`text-white cursor-pointer hover:bg-white/10 hover:text-white ${
                      activeItem === "perfiles" || // Si "perfiles" es la vista activa o una de sus sub-vistas
                      activeItem === "estadisticas" ||
                      activeItem === "fondos" ||
                      activeItem === "formularios"
                        ? "bg-white/10"
                        : ""
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Perfiles de proyecto
                    <ChevronDown className="w-4 h-4 ml-1 -mr-1" />{" "}
                    {/* Icono de flecha hacia abajo */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md mt-2">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => onNavItemClick("estadisticas")}
                  >
                    <BarChart className="w-4 h-4 mr-2 text-gray-700" />
                    Estadísticas
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => onNavItemClick("fondos")}
                  >
                    <DollarSign className="w-4 h-4 mr-2 text-gray-700" />
                    Fondos
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => onNavItemClick("formularios")}
                  >
                    <ClipboardList className="w-4 h-4 mr-2 text-gray-700" />
                    Formularios
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
          {/* Aquí puedes añadir otros elementos del lado derecho del navbar si los hubiera */}
        </div>
      </div>
    </header>
  );
}
