import { Alert, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function TableEncuestas(props) {
  const nuevaFuncionEliminar = (idEncuesta) => {
    props.eliminarEncuestas(idEncuesta);
  };

  return (
    <div>
      {props.dataEncuestas.length === 0 ? (
        <Alert variant="secondary">
          No hay encuestas realizadas por este usuario
        </Alert>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Responder</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {props.dataEncuestas.map((encuesta) => {
              return (
                <tr key={encuesta.idEncuesta}>
                  <td>
                    <Link
                      to={
                        "http://localhost:3000/Encuesta/" + encuesta.idEncuesta
                      }
                    >
                      {" "}
                      Enlace{" "}
                    </Link>
                  </td>
                  <td>{encuesta.nombre}</td>
                  <td>{encuesta.descripcion}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        props.editarEncuesta(encuesta);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      style={{ margin: "2px" }}
                      onClick={() => {
                        nuevaFuncionEliminar(encuesta.idEncuesta);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TableEncuestas;
