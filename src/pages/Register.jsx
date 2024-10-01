import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("¡Por favor, complete todos los campos!");
      return;
    }
    
    if (password.length < 5) {
      alert("¡La contraseña debe tener al menos 5 caracteres!");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("¡Las contraseñas no coinciden!");
      return;
    }
    
    const success = await register(email, password);
    if (success) {
      alert("¡Registro exitoso!");
      navigate("/");
    } else {
      alert("El registro falló. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Ingrese su correo electrónico"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="form-label"
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirme su contraseña"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!email || !password || !confirmPassword}
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


