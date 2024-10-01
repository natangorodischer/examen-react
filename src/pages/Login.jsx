import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("¡Por favor, complete todos los campos!");
      return;
    }
    
    if (password.length < 5) {
      alert("¡La contraseña debe tener al menos 5 caracteres!");
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } else {
      alert("Error de inicio de sesión. Por favor, verifique sus credenciales.");
    }
  };

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <h1>Iniciar Sesión</h1>
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!email || !password}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;