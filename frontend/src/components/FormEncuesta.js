import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { URL_API } from "../constants";

function FormEncuesta() {
  let { id } = useParams();
  const [dataEncuesta, setDataEncuesta] = useState();
  const [dataCampos, setDataCampos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getEncuesta = async () => {
    await fetch(`${URL_API}/Encuesta/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataEncuesta(data);
        return fetch(`${URL_API}/Campo/${data[0].idEncuesta}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setDataCampos(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEncuesta();
  }, []);

  const CampoInput = ({ campo }) => {
    let input;
    switch (campo.idTipo) {
      case 1:
        input = (
          <>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>{campo.nombre}</Form.Label>
              <Form.Control type="date" required={campo.isRequerido} />
            </Form.Group>
          </>
        );
        break;
      case 2:
        input = (
          <>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>{campo.nombre}</Form.Label>
              <Form.Control type="text" required={campo.isRequerido} />
            </Form.Group>
          </>
        );
        break;
      case 3:
        input = (
          <>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>{campo.nombre}</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
          </>
        );
        break;

      default:
        input = null;
    }
    return <div>{input}</div>;
  };

  return (
    <div>
      {isLoading === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h1>CARGANDO ENCUESTA... </h1>
          <img
            alt="loading"
            src="https://cdn-icons-png.flaticon.com/512/4461/4461744.png"
            height="20%"
            width="20%"
            style={{ margin: "1%" }}
          ></img>
        </div>
      ) : (
        <Container>
          <div>
            <h1>Encuesta de {dataEncuesta[0]?.nombre}</h1>
            <p> {dataEncuesta[0]?.descripcion}</p>
            <Form>
              {dataCampos.map((campo) => (
                <CampoInput key={campo.idCampo} campo={campo} />
              ))}
              <Button type="submit" variant="info">
                Enviar encuesta
              </Button>
            </Form>
          </div>
        </Container>
      )}
    </div>
  );
}

export default FormEncuesta;
