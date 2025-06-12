import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EditarEquipo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [anio_fundado, setAnio_fundado] = useState<number>(0);
  const [dni_presidente, setDni_presidente] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
      console.log("ID recibido:", ids);
        TraerEquipo();
     },[]);

    const TraerEquipo = async () => {
      const respuesta = await fetch(`http://localhost:7000/equipos/${ids}`);
      const dato = await respuesta.json();
      const equipo = dato.mensaje[0]; 
      setId(equipo.id)
      setNombre(equipo.nombre);
      setAnio_fundado(equipo.anio_fundado);
      setDni_presidente(equipo.dni_presidente);
    };

      const ids = location.state; 



  const actualizar = async () => {
    const respuesta = await fetch(`http://localhost:7000/equipos/${ids}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, anio_fundado, dni_presidente }),
    });

    const resultado = await respuesta.json();
    setMensaje(resultado.mensaje);
    navigate("/Actualizar/equipos");

  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-warning mb-4">🛠️ Editar Equipo</h2>
      <Form>
         <Form.Group className="mb-3">
           <Form.Label>ID</Form.Label>
           <Form.Control type="text" value={id} disabled />
           </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del equipo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Año Fundado</Form.Label>
          <Form.Control
            type="number"
            value={anio_fundado}
            onChange={(e) => setAnio_fundado(Number(e.target.value))}
            placeholder="Ej: 1995"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DNI Presidente</Form.Label>
          <Form.Control
            type="number"
            value={dni_presidente}
            onChange={(e) => setDni_presidente(Number(e.target.value))}
            placeholder="Ej: 12345678"
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

export default EditarEquipo;
