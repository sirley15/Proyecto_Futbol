import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registrar = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:7000/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_completo:nombre, correo, password }),
    });

    const data = await res.json();

    if (data.mensaje === "registro correcto") {
      alert("Registro exitoso");
      navigate("/");
    } else {
      alert("Error en el registro");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={registrar} className="bg-white p-5 rounded shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Registrarse</h3>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
        <div className="text-center mt-3">
          <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </form>
    </div>
  );
};
export default Registro;
