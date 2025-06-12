import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Enviar = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:7000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    });

    const data = await res.json();

    if (data.mensaje === "bienvenido") {
      localStorage.setItem("correo", correo);
      navigate("/crear/equipos");
    } else {
      alert("Error al iniciar sesión: correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          <form onSubmit={Enviar}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                placeholder="Escribe tu correo"
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Escribe la contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
            <div className="text-center mt-3">
              <a onClick={() => navigate("/registro")} style={{ cursor: "pointer" }}>
                Registrarse
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;