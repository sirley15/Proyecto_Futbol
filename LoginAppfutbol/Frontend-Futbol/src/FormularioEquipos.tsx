import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormularioEquipos: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [anio_fundado, setAnio_fundado] = useState<number>(0);
  const [dni_presidente, setDni_presidente] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string>("");

  const GuardarEquipo = async () => {
    const respuesta = await fetch("http://localhost:7000/equipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, anio_fundado, dni_presidente }),
    });
    const msj = await respuesta.json();
    setMensaje(msj.mensaje);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4 text-primary">Crear Nuevo Equipo 🏆</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Equipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe el nombre del equipo"
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Año de Fundación</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej. 1995"
                onChange={(e) => setAnio_fundado(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DNI del Presidente</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el DNI del presidente"
                onChange={(e) => setDni_presidente(Number(e.target.value))}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mt-2"
              onClick={GuardarEquipo}
            >
              Guardar Equipo
            </Button>
          </Form>

          {mensaje && (
            <Alert variant="success" className="mt-4 text-center">
              {mensaje}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioEquipos;
