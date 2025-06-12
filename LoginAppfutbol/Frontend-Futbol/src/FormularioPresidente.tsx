import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FormularioPresidente: React.FC = () => {
  const [dni, setDni] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  const GuardarPresidente = async () => {
    const respuesta = await fetch("http://localhost:7000/presidente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dni, nombre }),
    });
    const msj = await respuesta.json();
    setMensaje(msj.mensaje);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4 text-primary">🧑‍💼 Crear Nuevo Presidente</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>DNI del Presidente</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el DNI del presidente"
                onChange={(e) => setDni(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre del Presidente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe el nombre del presidente"
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="w-100 mt-2" onClick={GuardarPresidente}>
              Guardar Presidente
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

export default FormularioPresidente;
