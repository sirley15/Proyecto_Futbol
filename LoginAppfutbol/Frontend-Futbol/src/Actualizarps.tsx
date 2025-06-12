import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EditarPresidente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ids = location.state;

  const [dni_presidente, setDni_presidente] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
    console.log("ID recibido:", ids);
    TraerPresi();
  }, []);

  const TraerPresi = async () => {
    const respuesta = await fetch(`http://localhost:7000/presidente/${ids}`);
    const equipo = await respuesta.json();
    setDni_presidente(equipo.dni);
    setNombre(equipo.nombre);
  };

  const actualizar = async () => {
    const respuesta = await fetch(`http://localhost:7000/presidente/${ids}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }), }
    );
    const resultado = await respuesta.json();
    setMensaje(resultado.mensaje);
    navigate("/Actualizar/presidentes");

  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-warning mb-4">🛠️ Editar Presidente</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>DNI</Form.Label>
          <Form.Control type="text" value={dni_presidente} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del presidente"
          />
        </Form.Group>

        <Button variant="primary" onClick={actualizar}>
          Guardar Cambios
        </Button>
      </Form>

      {mensaje && <Alert className="mt-3" variant="success">{mensaje}</Alert>}
    </Container>
  );
};

export default EditarPresidente;
