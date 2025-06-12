import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbars: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const ocultarNavbar = location.pathname === "/" || location.pathname === "/registro";

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    if (storedNombre) {
      setNombre(storedNombre);
    } else {
      setNombre("");
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem("correo");
    localStorage.removeItem("nombre");
    localStorage.removeItem("auth");
    navigate("/");
  };

  if (ocultarNavbar) {
    return null;
  }

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="shadow-lg py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white fs-4">
          ⚽ ORG DEPORTIVA
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <NavDropdown
              title={<span className="text-white text-uppercase fw-semibold">🆕 Registrar</span>}
              id="crear-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/crear/equipos">🛡️ Registrar Equipos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/crear/presidente">👔 Registrar Presidente</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<span className="text-white text-uppercase fw-semibold">📋 Lista deportiva</span>}
              id="listar-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/listar/equipos">📝 Listar Equipos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/listar/presidentes">📄 Listar Presidentes</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<span className="text-white text-uppercase fw-semibold">🔁 Actualizar</span>}
              id="actualizar-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/actualizar/equipos">🔧 Actualizar Equipos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/actualizar/presidentes">🔄 Actualizar Presidentes</NavDropdown.Item>
            </NavDropdown>

            {nombre && <span className="text-white fw-medium">🎉 {nombre}</span>}

            <button
              onClick={logout}
              className="btn btn-outline-light btn-sm ms-2"
            >
              Cerrar sesión
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
