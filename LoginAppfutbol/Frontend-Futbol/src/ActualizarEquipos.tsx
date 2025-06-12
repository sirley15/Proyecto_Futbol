import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Equipos {
  id: number;
  nombre: string;
  anio_fundado: number;
  dni_presidente: number;
}

const Actualizar: React.FC = () => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<Equipos[]>([]);

  const Listar = async () => {
    const rest = await fetch("http://localhost:7000/equipos");
    const datos = await rest.json();
    setEquipos(datos.mensaje);
  };

  const Eliminar = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este equipo?")) return;

    const restp = await fetch(`http://localhost:7000/equipos/${id}`, {
      method: "DELETE",
    });

    const msj = await restp.json();
    Listar();
  };

  const actualizar2 = (ids: number) => {
    navigate("/ActualizarEq", { state: ids }); 
  };

  useEffect(() => {
    Listar();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center text-success mb-4">⚽ Actualizar Equipos</h2>
      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Año Fundado</th>
              <th>DNI Presidente</th>
              <th>Eliminar</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo) => (
              <tr key={equipo.id}>
                <td>{equipo.id}</td>
                <td>{equipo.nombre}</td>
                <td>{equipo.anio_fundado}</td>
                <td>{equipo.dni_presidente}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => Eliminar(equipo.id)}>
                    Eliminar
                  </Button>
                </td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => actualizar2(equipo.id)}>
                    Actualizar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Actualizar;
