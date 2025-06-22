"use client";

import {
  BarChart3,
  Building2,
  DollarSign,
  FileText,
  GraduationCap,
  Home,
  PieChart,
  Users,
  University,
  Lightbulb, // Nuevo icono para "Monto Formulado"
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
} from "recharts";

export default function EstadisticasPage() {
  // Datos simulados
  const indicadoresPrincipales = {
    proyectosEnCartera: 47,
    montoFormulado: 21.633, // MM$
    escuelasFIN: 7,
    academicosInvolucrados: 21,
    empresasPartners: 12,
    universidadesPartners: 5,
  };

  const tematicas = [
    "Hidrógeno Verde",
    "Digital Twins",
    "Mujeres en STEM",
    "Realidad Virtual",
    "Entre otros",
  ];

  const instrumentosPostulados = [
    {
      nombre: "Centros Tecnológicos Innovación, CORFO",
      monto: 8.737,
    },
    {
      nombre: "Anillos Tecnológicos, ANID",
      monto: 660,
    },
    {
      nombre: "Centros Tecnológicos Innovación, ANID",
      monto: 10.628,
    },
    {
      nombre: "Fondo Regional Productividad y Desarrollo, GORE V",
      monto: 776,
    },
  ];

  // Datos para gráficos basados en la imagen beta
  // Mantuve los datos originales pero considera que si cambias los indicadores,
  // estos datos deberían ser consistentes.
  const profesoresPorUnidad = [
    { unidad: "Ing. Informática", profesores: 15 },
    { unidad: "Ing. Industrial", profesores: 12 },
    { unidad: "Ing. Civil", profesores: 10 },
    { unidad: "Ing. Química", profesores: 8 },
    { unidad: "Ing. Eléctrica", profesores: 7 },
    { unidad: "Ing. Mecánica", profesores: 6 },
    { unidad: "Arquitectura", profesores: 5 },
    { unidad: "Matemáticas", profesores: 4 },
    { unidad: "Física", profesores: 3 },
  ];

  const proyectosPorProfesor = [
    { profesor: "Dr. García", proyectos: 8 },
    { profesor: "Dra. López", proyectos: 6 },
    { profesor: "Dr. Martínez", proyectos: 5 },
    { profesor: "Dra. Rodríguez", proyectos: 4 },
    { profesor: "Dr. González", proyectos: 4 },
    { profesor: "Dra. Hernández", proyectos: 3 },
  ];

  const proyectosPorTematica = [
    { name: "Almacenamiento Energía", value: 12, color: "#8B5CF6" },
    { name: "Hidrógeno", value: 10, color: "#10B981" },
    { name: "Contaminación Lumínica", value: 8, color: "#F59E0B" },
    { name: "Digital Twins", value: 7, color: "#EF4444" },
    { name: "Otros", value: 10, color: "#6B7280" },
  ];

  const proyectosPorInstitucion = [
    { name: "ANID", value: 15, color: "#EC4899" },
    { name: "CORFO", value: 12, color: "#F59E0B" },
    { name: "CONICYT", value: 10, color: "#10B981" },
    { name: "GORE", value: 8, color: "#3B82F6" },
    { name: "Otros", value: 2, color: "#6B7280" },
  ];

  const proyectosPorUnidad = [
    { unidad: "Ing. Informática", proyectos: 12 },
    { unidad: "Ing. Industrial", proyectos: 15 },
    { unidad: "Ing. Civil", proyectos: 8 },
    { unidad: "Ing. Química", proyectos: 7 },
    { unidad: "Ing. Eléctrica", proyectos: 5 },
  ];

  // Paleta de azules
  const bluePalette = [
    "#2E5C8A", // Azul principal
    "#5D95C8", // Azul medio
    "#7CA3CB", // Azul claro
    "#3B82F6", // Azul acento
    "#1E3A5C", // Azul oscuro
  ];

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Título principal */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Estadísticas</h2>
          <p className="text-gray-600 mt-2">
            Datos para la toma de decisiones estratégicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#5c8ebf] rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <FileText className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">
                {indicadoresPrincipales.proyectosEnCartera}
              </span>
            </div>
            <h3 className="text-base font-bold mb-2">PROYECTOS EN CARTERA</h3>
            <div className="flex flex-wrap justify-around gap-2">
              <span className="bg-[#2E5C8A] px-4 py-0.5 rounded-full text-s">
                Postulados
              </span>
              <span className="bg-[#2E5C8A] px-4 py-0.5 rounded-full text-s">
                Perfilados
              </span>
            </div>
          </div>
          {/* Monto Formulado (Segunda de la primera fila) */}
          <div className="bg-[#5c8ebf] rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <DollarSign className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">
                {indicadoresPrincipales.montoFormulado}
              </span>
            </div>
            <h3 className="text-base font-bold">MM$ EN PROYECTOS FORMULADOS</h3>
            <div className="h-[22px]"></div>
          </div>
          {/* Escuelas y Académicos (Tercera de la primera fila) */}
          <div className="bg-[#5c8ebf] rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <GraduationCap className="h-7 w-7 opacity-80" />
                <span className="text-3xl font-bold">
                  {indicadoresPrincipales.escuelasFIN}
                </span>
              </div>
              <h3 className="text-sm font-bold -mt-2">ESCUELAS DE LA FIN</h3>
              <div className="border-t border-white pt-4 mt-4">
                <div className="flex items-start justify-between">
                  <Users className="h-7 w-7 opacity-80" />
                  <span className="text-3xl font-bold">
                    {indicadoresPrincipales.academicosInvolucrados}
                  </span>
                </div>
                <h3 className="text-sm font-bold -mt-2">
                  ACADÉMICOS INVOLUCRADOS
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#5c8ebf] rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <Building2 className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">
                {indicadoresPrincipales.empresasPartners}
              </span>
            </div>
            <h3 className="text-base font-bold">EMPRESAS PARTNERS</h3>
            <div className="h-[22px]"></div>
          </div>
          <div className="bg-[#5c8ebf] rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <University className="h-8 w-8 opacity-80" />
              <span className="text-4xl font-bold">
                {indicadoresPrincipales.universidadesPartners}
              </span>
            </div>
            <h3 className="text-base font-bold">UNIVERSIDADES PARTNERS</h3>
            <div className="h-[22px]"></div>
          </div>
        </div>
        {/* Temáticas */}
        <div className="bg-[#5c8ebf] rounded-xl p-6 text-white shadow-lg flex flex-col items-center min-h-[220px]">
          <h3 className="text-2xl font-bold mb-6 text-center">TEMÁTICAS</h3>
          <div className="grid grid-cols-3 gap-4 w-full mb-4">
            {/* Fila 1: 3 temáticas */}
            {tematicas.slice(0, 3).map((tematica, index) => (
              <div
                key={index}
                className="bg-[#2E5C8A] px-4 py-6 rounded-md text-lg text-center flex items-center justify-center"
              >
                {tematica}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 w-2/3">
            {/* Fila 2: 2 temáticas */}
            {tematicas.slice(3, 5).map((tematica, index) => (
              <div
                key={index + 3}
                className="bg-[#2E5C8A] px-4 py-6 rounded-md text-lg text-center flex items-center justify-center"
              >
                {tematica}
              </div>
            ))}
          </div>
        </div>

        {/* Instrumentos Postulados */}
        <div className="bg-[#5c8ebf] rounded-xl p-8 text-white shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            INSTRUMENTOS A LOS QUE SE HA POSTULADO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instrumentosPostulados.map((instrumento, index) => (
              <div
                key={index}
                className="bg-[#2E5C8A] items-center  flex flex-col rounded-xl p-6"
              >
                <h4 className="font-semibold text-lg mb-2">
                  {instrumento.nombre}
                </h4>
                <p className="text-2xl font-bold">({instrumento.monto} MM$)</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución por Áreas */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Distribución por Áreas</h2>
          <p className="text-gray-600 mt-2">
            Descubre cómo se distribuyen los proyectos y recursos en las
            distintas áreas
          </p>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Profesores por Unidad Académica */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Profesores por Unidad Académica
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profesoresPorUnidad}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="unidad"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="profesores" fill="#2E5C8A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Proyectos por Profesor */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Proyectos por Profesor
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={proyectosPorProfesor}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="profesor"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="proyectos" fill="#5D95C8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Proyectos por Temática */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Proyectos por Temática
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={proyectosPorTematica}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {proyectosPorTematica.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={bluePalette[index % bluePalette.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Proyectos por Institución */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Proyectos por Institución
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={proyectosPorInstitucion}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {proyectosPorInstitucion.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={bluePalette[index % bluePalette.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Proyectos por Unidad */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Proyectos por Unidad
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proyectosPorUnidad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="unidad"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="proyectos" fill="#7CA3CB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
