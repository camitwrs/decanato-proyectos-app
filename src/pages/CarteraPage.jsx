import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  UserPlus,
  Check,
  ArrowLeft,
  Settings,
  FolderPlus,
  Sheet,
} from "lucide-react";

export default function CarteraPage() {
  const [currentView, setCurrentView] = useState("main"); // 'main', 'add-project', 'manage-data'

  // Datos de ejemplo para las tablas editables
  const [themes, setThemes] = useState([
    { id: 1, name: "Economía Circular", editable: false },
    { id: 2, name: "Interdisciplina", editable: false },
    { id: 3, name: "Hidrógeno", editable: false },
    { id: 4, name: "Biotecnología", editable: false },
    { id: 5, name: "Astronomía", editable: false },
  ]);

  const [statuses, setStatuses] = useState([
    { id: 1, name: "Postulado", editable: false },
    { id: 2, name: "En Progreso", editable: false },
    { id: 3, name: "Completado", editable: false },
    { id: 4, name: "Pausado", editable: false },
  ]);

  const [convocatorias, setConvocatorias] = useState([
    { id: 1, name: "FRPD GORE Valparaíso", editable: false },
    { id: 2, name: "FOVI", editable: false },
    {
      id: 3,
      name: "Programa de Formación para la competitividad",
      editable: false,
    },
  ]);

  const [units, setUnits] = useState([
    { id: 1, name: "Escuela de Ingeniería Civil", editable: false },
    { id: 2, name: "Escuela de Ingeniería Química", editable: false },
    { id: 3, name: "Facultad de Ingeniería", editable: false },
    { id: 4, name: "Facultad de Ciencias", editable: false },
  ]);

  const mockAcademics = [
    "ÁLVARO DÍAZ",
    "CARLOS JAVIER CARLESI",
    "SEBASTIÁN CARLOS FINGERHUTH",
    "MARÍA GONZÁLEZ",
    "JUAN PÉREZ",
  ];

  const [formData, setFormData] = useState({
    name: "",
    comments: "",
    amount: "",
    themes: [],
    supportType: { total: false, parcial: false },
    date: "",
    status: "",
    convocatoria: "",
    unit: "",
    academics: [],
  });
  const [selectedAcademics, setSelectedAcademics] = useState([]);
  const [customAcademic, setCustomAcademic] = useState("");
  const [showCustomAcademic, setShowCustomAcademic] = useState(false);
  const [editingCell, setEditingCell] = useState({ table: null, id: null });
  const [tempValue, setTempValue] = useState("");

  const handleAddAcademic = (academic) => {
    if (!selectedAcademics.includes(academic)) {
      setSelectedAcademics([...selectedAcademics, academic]);
    }
  };

  const handleRemoveAcademic = (academic) => {
    setSelectedAcademics(selectedAcademics.filter((a) => a !== academic));
  };

  const handleAddCustomAcademic = () => {
    if (
      customAcademic.trim() &&
      !selectedAcademics.includes(customAcademic.trim())
    ) {
      setSelectedAcademics([...selectedAcademics, customAcademic.trim()]);
      setCustomAcademic("");
      setShowCustomAcademic(false);
    }
  };

  const handleEditCell = (table, id, currentValue) => {
    setEditingCell({ table, id });
    setTempValue(currentValue);
  };

  const handleSaveCell = (table, id) => {
    const updateFunction = {
      themes: setThemes,
      statuses: setStatuses,
      convocatorias: setConvocatorias,
      units: setUnits,
    }[table];

    const currentData = {
      themes,
      statuses,
      convocatorias,
      units,
    }[table];

    updateFunction(
      currentData.map((item) =>
        item.id === id ? { ...item, name: tempValue } : item
      )
    );
    setEditingCell({ table: null, id: null });
    setTempValue("");
  };

  const handleCancelEdit = () => {
    setEditingCell({ table: null, id: null });
    setTempValue("");
  };

  const handleDeleteRow = (table, id) => {
    const updateFunction = {
      themes: setThemes,
      statuses: setStatuses,
      convocatorias: setConvocatorias,
      units: setUnits,
    }[table];

    const currentData = {
      themes,
      statuses,
      convocatorias,
      units,
    }[table];

    updateFunction(currentData.filter((item) => item.id !== id));
  };

  const handleAddRow = (table) => {
    const currentData = {
      themes,
      statuses,
      convocatorias,
      units,
    }[table];

    const updateFunction = {
      themes: setThemes,
      statuses: setStatuses,
      convocatorias: setConvocatorias,
      units: setUnits,
    }[table];

    const newId = Math.max(...currentData.map((item) => item.id)) + 1;
    updateFunction([
      ...currentData,
      { id: newId, name: "Nuevo elemento", editable: false },
    ]);
  };

  const EditableTable = ({ title, data, tableName }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Button
          size="sm"
          onClick={() => handleAddRow(tableName)}
          className="bg-[#2E5C8A] hover:bg-[#1E4A6F]"
        >
          <Plus className="w-4 h-4 mr-1" />
          Añadir
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Nombre
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 w-24">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {editingCell.table === tableName &&
                  editingCell.id === item.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            handleSaveCell(tableName, item.id);
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveCell(tableName, item.id)}
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onClick={() =>
                        handleEditCell(tableName, item.id, item.name)
                      }
                    >
                      {item.name}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleEditCell(tableName, item.id, item.name)
                      }
                      className="text-[#2E5C8A] border-[#2E5C8A] hover:bg-[#2E5C8A] hover:text-white"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteRow(tableName, item.id)}
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Vista Principal - Landing Page
  const MainView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cartera de Proyectos
        </h1>
        <p className="text-xl text-gray-600">¿Qué te gustaría hacer hoy?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Opción 1: Añadir proyecto */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() => setCurrentView("add-project")}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <FolderPlus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Añadir proyecto
            </h2>
            <p className="text-gray-600 mb-6">
              Crea un nuevo proyecto completando el formulario con toda la
              información necesaria
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-sky-600 rounded-full mr-2"></div>
                Información básica del proyecto
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-sky-600 rounded-full mr-2"></div>
                Asignación de académicos
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-sky-600 rounded-full mr-2"></div>
                Configuración de temáticas y estatus
              </div>
            </div>
          </div>
        </div>

        {/* Opción 2: Editar */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() => setCurrentView("manage-data")}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Edit  className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Editar</h2>
            <p className="text-gray-600 mb-6">
              Administra las temáticas, estatus, convocatorias y unidades
              académicas del sistema
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
                Edición directa tipo Excel
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
                Añadir y eliminar elementos
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
                Organización por categorías
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Vista de Añadir proyecto
  const AddProjectView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => setCurrentView("main")}
          className="text-[#2E5C8A] text-lg hover:bg-blue-50 mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Añadir proyecto</h1>
          <p className="text-gray-600">
            Complete la información del nuevo proyecto
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nombre del Proyecto
              </Label>
              <Input
                id="name"
                placeholder="Ingrese el nombre del proyecto"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label
                htmlFor="comments"
                className="text-sm font-medium text-gray-700"
              >
                Comentarios
              </Label>
              <Textarea
                id="comments"
                placeholder="Agregue comentarios relevantes"
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label
                htmlFor="amount"
                className="text-sm font-medium text-gray-700"
              >
                Monto
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Temática
              </Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccione una temática / Buscar temática" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.name}>
                      {theme.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="otro">Otro / Por Definir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Tipo(s) de Apoyo
              </Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="total"
                    checked={formData.supportType.total}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        supportType: {
                          ...formData.supportType,
                          total: checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor="total" className="text-sm">
                    Total
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parcial"
                    checked={formData.supportType.parcial}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        supportType: {
                          ...formData.supportType,
                          parcial: checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor="parcial" className="text-sm">
                    Parcial
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Fecha de Registro
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Estatus
              </Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccione un estatus / Buscar estatus" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.id} value={status.name}>
                      {status.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="otro">Otro / Por Definir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Convocatoria
              </Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccione una convocatoria / Buscar convocatoria" />
                </SelectTrigger>
                <SelectContent>
                  {convocatorias.map((conv) => (
                    <SelectItem key={conv.id} value={conv.name}>
                      {conv.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="otro">Otro / Por Definir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Unidad Académica
              </Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccione una Unidad / Buscar Unidad" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="otro">Otro / Por Definir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Académicos
              </Label>
              <Select onValueChange={handleAddAcademic}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccione un académico / Buscar académico" />
                </SelectTrigger>
                <SelectContent>
                  {mockAcademics.map((academic) => (
                    <SelectItem key={academic} value={academic}>
                      {academic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Académicos seleccionados */}
              {selectedAcademics.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedAcademics.map((academic) => (
                    <Badge
                      key={academic}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {academic}
                      <button
                        onClick={() => handleRemoveAcademic(academic)}
                        className="ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Botón para añadir académico personalizado */}
              <div className="mt-2">
                {!showCustomAcademic ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCustomAcademic(true)}
                    className="text-[#2E5C8A] border-[#2E5C8A] hover:bg-[#2E5C8A] hover:text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Añadir académico no registrado
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nombre del académico"
                      value={customAcademic}
                      onChange={(e) => setCustomAcademic(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={handleAddCustomAcademic}
                      className="bg-[#2E5C8A] hover:bg-[#1E4A6F]"
                    >
                      Añadir
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowCustomAcademic(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3 pt-8 border-t mt-8">
          <Button variant="outline" onClick={() => setCurrentView("main")}>
            Cancelar
          </Button>
          <Button className="bg-[#2E5C8A] hover:bg-[#1E4A6F]">
            <Save className="w-4 h-4 mr-2" />
            Guardar Proyecto
          </Button>
        </div>
      </div>
    </div>
  );

  // Vista de Gestión de Datos
  const ManageDataView = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={() => setCurrentView("main")}
          className="text-[#2E5C8A] text-lg hover:bg-blue-50 mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Editar Cartera de Proyectos
          </h1>
          <p className="text-gray-600">
            Administra las categorías y elementos del sistema
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <Tabs defaultValue="themes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              value="themes"
              className="data-[state=active]:bg-[#2E5C8A] data-[state=active]:text-white"
            >
              Temáticas
            </TabsTrigger>
            <TabsTrigger
              value="statuses"
              className="data-[state=active]:bg-[#2E5C8A] data-[state=active]:text-white"
            >
              Estatus
            </TabsTrigger>
            <TabsTrigger
              value="convocatorias"
              className="data-[state=active]:bg-[#2E5C8A] data-[state=active]:text-white"
            >
              Convocatorias
            </TabsTrigger>
            <TabsTrigger
              value="units"
              className="data-[state=active]:bg-[#2E5C8A] data-[state=active]:text-white"
            >
              Unidades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="themes">
            <EditableTable title="Temáticas" data={themes} tableName="themes" />
          </TabsContent>

          <TabsContent value="statuses">
            <EditableTable
              title="Estatus"
              data={statuses}
              tableName="statuses"
            />
          </TabsContent>

          <TabsContent value="convocatorias">
            <EditableTable
              title="Convocatorias"
              data={convocatorias}
              tableName="convocatorias"
            />
          </TabsContent>

          <TabsContent value="units">
            <EditableTable
              title="Unidades Académicas"
              data={units}
              tableName="units"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-12">
      {/* Ya no necesitas una etiqueta <main> aquí dentro si la tienes en App.jsx */}
      {currentView === "main" && <MainView />}
      {currentView === "add-project" && <AddProjectView />}
      {currentView === "manage-data" && <ManageDataView />}
    </div>
  );
}
