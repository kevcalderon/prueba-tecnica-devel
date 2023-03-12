import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { URL_API } from "../constants";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    //   console.log(data);
    let requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    await fetch(`${URL_API}/Usuario/login`, requestBody)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Swal.fire({
            title: "Notificación",
            text: `${data.message}`,
          });
        } else {
          const usuarioJSON = JSON.stringify(data);
          localStorage.setItem("usuario", usuarioJSON);
          navigate(`/Encuesta`);
        }
      })
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <div>
      <Container>
        <div style={{ margin: "6%" }}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu username"
                {...register("username", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register("password", { required: true })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
            <Link to="/Registro">
              <Button variant="success" type="button" style={{ margin: "1%" }}>
                Registrar
              </Button>
            </Link>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
