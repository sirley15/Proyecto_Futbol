import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Equipos {
  id: number;
  nombre: string;
  anio_fundado: number;
  dni_presidente: number;
}

const ListarEquipos: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [valorBusqueda, setValorBusqueda] = useState<string>("");
  const [mensajeBusqueda, setMensajeBusqueda] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Equipos | null>(null);

  const Listar = async () => {
    const res = await fetch("http://localhost:7000/equipos");
    const datos = await res.json();
    setEquipos(datos.mensaje);
  };

  const BuscarEquipo = async () => {
    const res = await fetch(`http://localhost:7000/equipos/buscar/${valorBusqueda}`);
    const data = await res.json();
    setMensajeBusqueda(data.mensaje);
    setResultadoBusqueda(data.data || null);
  };

  useEffect(() => {
    Listar();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center text-primary mb-4">📋 Lista de Equipos</h2>

      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre o año"
            value={valorBusqueda}
            onChange={(e) => setValorBusqueda(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Button variant="success" className="w-100" onClick={BuscarEquipo}>
            Buscar Equipo
          </Button>
        </Col>
      </Row>

      {mensajeBusqueda &&(
        <Alert>{mensajeBusqueda}</Alert>
      )}

      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Año Fundado</th>
              <th>DNI Presidente</th>
            </tr>
          </thead>
          <tbody>
            {resultadoBusqueda ? (
              <tr>
                <td>{resultadoBusqueda.id}</td>
                <td>{resultadoBusqueda.nombre}</td>
                <td>{resultadoBusqueda.anio_fundado}</td>
                <td>{resultadoBusqueda.dni_presidente}</td>
              </tr>
            ) : (
              equipos.map((equipo) => (
                <tr>
                  <td>{equipo.id}</td>
                  <td>{equipo.nombre}</td>
                  <td>{equipo.anio_fundado}</td>
                  <td>{equipo.dni_presidente}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ListarEquipos;
