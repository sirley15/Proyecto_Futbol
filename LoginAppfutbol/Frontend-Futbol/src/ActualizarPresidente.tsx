import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface Presidentes {
  dni: number;
  nombre: string;
}

const ActualizarPresidentes: React.FC = () => {
  const navigate = useNavigate();
  const [presidentes, setPresidentes] = useState<Presidentes[]>([]);

  const Listar = async () => {
    const rest = await fetch("http://localhost:7000/presidente");
    const datos = await rest.json();
    setPresidentes(datos.data);
  };

  const EliminarPresidente = async (dni: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este presidente?")) return;

    const restp = await fetch(`http://localhost:7000/presidente/${dni}`, {
      method: "DELETE",
    });

    const msj = await restp.json();
    alert(msj.mensaje || "Presidente eliminado");
    Listar();
  };

  const actualizarPresin = (dni: number) => {
    navigate("/ActualizarPresin", { state: dni });
  };

  useEffect(() => {
    Listar();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center text-primary mb-4">✏️ Actualizar Presidentes</h2>
      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>DNI Presidente</th>
              <th>Nombre</th>
              <th>Eliminar</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {presidentes.map((presidente) => (
              <tr key={presidente.dni}>
                <td>{presidente.dni}</td>
                <td>{presidente.nombre}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => EliminarPresidente(presidente.dni)}
                  >
                    Eliminar
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => actualizarPresin(presidente.dni)}
                  >
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

export default ActualizarPresidentes;
