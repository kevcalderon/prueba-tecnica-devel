import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Modal, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { URL_API } from "../constants";
import TableEncuestas from "./TableEncuestas";
import Swal from "sweetalert2";

function Encuesta() {
  const {
    register: registerCampo,
    handleSubmit: handleSubmitCampo,
    reset: resetCampo,
  } = useForm();

  const {
    register: registerEncuesta,
    handleSubmit: handleSubmitEncuesta,
    reset: resetEncuesta,
  } = useForm();

  const {
    register: editEncuesta,
    handleSubmit: handleEditEncuesta,
    reset: resetUpdate,
  } = useForm();

  const [campos, setCampos] = useState([]);
  const [camposEdit, setCamposEdit] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dataEncuestas, setDataEncuestas] = useState([]);
  const usuarioJSON = localStorage.getItem("usuario");
  const usuario = JSON.parse(usuarioJSON);
  const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    resetUpdate();
  };
  const handleShowUpdate = () => setShowUpdate(true);

  const onSubmitCampo = (data) => {
    data.isRequerido = data.isRequerido ? 1 : 0;
    setCampos([...campos, data]);
    handleClose();
    resetCampo();
  };

  const onSubmitEncuesta = async (data) => {
    console.log(data);
    data.idUsuario = usuario.idUsuario;
    let requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    await fetch(`${URL_API}/Encuesta`, requestBody)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        enviarCampos(data.id);
      })
      .catch((err) => {
        console.log(err);
      });
    resetEncuesta();
    verEncuestas();
  };

  const enviarCampos = async (idEncuesta) => {
    let requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idEncuesta: idEncuesta, campo: campos }),
    };
    await fetch(`${URL_API}/Campo`, requestBody)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCampos([]);
        Swal.fire({
          title: "Notificación",
          text: `Encuesta generada con el siguiente link: ${URL_API}/Encuesta/${idEncuesta}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verEncuestas = async () => {
    await fetch(`${URL_API}/Encuesta/user/${usuario.idUsuario}`)
      .then((response) => response.json())
      .then((data) => {
        setDataEncuestas(data);
      })
      .catch((err) => {
        console.log(err);
        setDataEncuestas([]);
      });
  };

  const eliminarEncuestas = async (id) => {
    let requestBody = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`${URL_API}/Encuesta/${id}`, requestBody)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        verEncuestas();
      })
      .catch((err) => console.log(err));
  };

  const editarEncuesta = async (encuesta) => {
    resetUpdate();
    setEncuestaSeleccionada({ ...encuesta, encuesta });
    handleShowUpdate(true);
    let requestBody = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(
      `${URL_API}/Campo/${parseInt(encuesta.idEncuesta)}`,
      requestBody
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setCamposEdit(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitEditEncuesta = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    verEncuestas();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1>E N C U E S T A S </h1>
          <img
            alt="logo"
            src="https://cdn-icons-png.flaticon.com/512/4325/4325535.png"
            height="10%"
            width="10%"
            style={{ margin: "1%" }}
          ></img>
        </div>
        <Row>
          <Col xs lg="4">
            <div
              style={{
                padding: "5%",
                borderRadius: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                border: "1px solid black",
                backgroundColor: "#d6ccc2",
              }}
            >
              <h3>Crear Encuesta</h3>
              <Form onSubmit={handleSubmitEncuesta(onSubmitEncuesta)}>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el nombre de la encuesta"
                    {...registerEncuesta("nombre", { required: true })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Ingresa una pequeña descripción"
                    {...registerEncuesta("descripcion", { required: true })}
                  />
                </Form.Group>
                <Button variant="dark" onClick={handleShow}>
                  Agregar Campo
                </Button>

                <hr></hr>
                <Form.Label
                  style={{
                    padding: "2%",
                    fontSize: "120%",
                    textDecoration: "underline",
                  }}
                >
                  Campos agregados :
                </Form.Label>
                <br></br>
                {campos.length === 0
                  ? "No hay campos agregados :c"
                  : campos.map((campo, index) => {
                      let badgeColor;
                      if (campo.tipo === 1) {
                        badgeColor = "success";
                      } else if (campo.tipo === 2) {
                        badgeColor = "info";
                      } else if (campo.tipo === 3) {
                        badgeColor = "warning";
                      }
                      return (
                        <Badge
                          key={index}
                          bg={badgeColor}
                          style={{ margin: "2%", fontSize: "100%" }}
                        >
                          {campo.nombre}
                        </Badge>
                      );
                    })}
                <hr></hr>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ display: "flex" }}
                >
                  Agregar encuesta
                  <img
                    alt="logo"
                    src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
                    height="30px"
                    width="30px"
                    style={{ margin: "1%" }}
                  ></img>
                </Button>
              </Form>
            </div>
          </Col>
          <Col>
            <TableEncuestas
              dataEncuestas={dataEncuestas}
              eliminarEncuestas={eliminarEncuestas}
              editarEncuesta={editarEncuesta}
            ></TableEncuestas>
          </Col>
        </Row>
        {/* MODAL DE CAMPOS */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Agregar Campo{" "}
              <img
                alt="logoCampo"
                src="https://cdn-icons-png.flaticon.com/512/4885/4885419.png"
                height="5%"
                width="5%"
                style={{ margin: "1%" }}
              ></img>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmitCampo(onSubmitCampo)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa nombre del campo"
                  {...registerCampo("nombre", { required: true })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el titulo"
                  {...registerCampo("titulo", {
                    required: true,
                  })}
                />
              </Form.Group>
              <Form.Label>Tipo de campo</Form.Label>
              <Form.Select
                aria-label="Default select example"
                {...registerCampo("idTipo", {
                  required: true,
                  valueAsNumber: true,
                })}
              >
                <option>Elige un tipo</option>
                <option value="1">Fecha</option>
                <option value="2">Texto</option>
                <option value="3">Numero</option>
              </Form.Select>
              <br></br>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="¿Es requerido?"
                  {...registerCampo("isRequerido", { valueAsNumber: true })}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar campo
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODAL PARA EDITAR */}
        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>
              Editar encuesta{" "}
              <img
                alt="editarEncuesta"
                src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                height="5%"
                width="5%"
                style={{ margin: "1%" }}
              ></img>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditEncuesta(onSubmitEditEncuesta)}>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el nombre de la encuesta"
                  {...editEncuesta("nombre", { required: true })}
                  value={encuestaSeleccionada?.nombre}
                  onChange={(e) => {
                    setEncuestaSeleccionada({
                      ...encuestaSeleccionada,
                      nombre: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Ingresa una pequeña descripción"
                  {...editEncuesta("descripcion", { required: true })}
                  value={encuestaSeleccionada?.descripcion}
                  onChange={(e) => {
                    setEncuestaSeleccionada({
                      ...encuestaSeleccionada,
                      descripcion: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <hr></hr>
              <h5>Campos agregados:</h5>
              {camposEdit.length === 0
                ? "No hay campos agregados :c"
                : campos.map((campo, index) => {
                    let badgeColor;
                    if (campo.tipo === 1) {
                      badgeColor = "success";
                    } else if (campo.tipo === 2) {
                      badgeColor = "info";
                    } else if (campo.tipo === 3) {
                      badgeColor = "warning";
                    }
                    return (
                      <Badge
                        key={index}
                        bg={badgeColor}
                        style={{ margin: "2%", fontSize: "100%" }}
                      >
                        {campo.nombre}
                      </Badge>
                    );
                  })}
              <hr></hr>
              <Button variant="warning" type="submit">
                Editar encuesta
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Encuesta;
