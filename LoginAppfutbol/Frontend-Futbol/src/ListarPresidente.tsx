import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Presidentes {
  dni: number;
  nombre: string;
}

const ListarPresidentes: React.FC = () => {
  const [presidentes, setPresidentes] = useState<Presidentes[]>([]);

  const Listar = async () => {
    const rest = await fetch("http://localhost:7000/presidente");
    const datos = await rest.json();
    setPresidentes(datos.data);
  };

  useEffect(() => {
    Listar();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center text-primary mb-4">👤 Lista de Presidentes</h2>
      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>DNI Presidente</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {presidentes.map((presidente) => (
              <tr key={presidente.dni}>
                <td>{presidente.dni}</td>
                <td>{presidente.nombre}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ListarPresidentes;
