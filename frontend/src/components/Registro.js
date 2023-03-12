import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { URL_API } from "../constants";
import Swal from "sweetalert2";

function Registro() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    await fetch(`${URL_API}/Usuario/registro`, requestBody)
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Notificación",
          text: `${data.message}`,
        });
      })
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <div>
      <Container>
        <div style={{ margin: "6%" }}>
          <h1>Registro</h1>
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
            <Button variant="warning" type="submit">
              Registrar Usuario
            </Button>
            <Link to="/">
              <Button variant="success" type="button" style={{ margin: "1%" }}>
                Login
              </Button>
            </Link>
          </Form>
        </div>
      </Container>
    </div>
  );
}
export default Registro;
