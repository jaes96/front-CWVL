import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.scss";

const ListTarea = ({ id }) => {
  const [dataTarea, setDataTarea] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(""); // Estado para almacenar el valor seleccionado del select
  const navega = useNavigate();

  useEffect(() => {
    axios
      .get(`https://examen-back.onrender.com/tarea`)
      .then(({ data }) => {
        setDataTarea(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function borrarTarea(idTarea) {
    axios
      .post("https://examen-back.onrender.com/eliminarTarea", { idTarea })
      .then((res) => {
        const { data } = res;
        alert(data.mensaje);
        navega(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSelectChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const listaTareas = selectedStatus
    ? dataTarea.filter((task) => task.status === selectedStatus)
    : dataTarea;

  return (
    <div>
      <div className={styles.containerfiltros}>
        <div className={styles.filtros}>
          <h2>Filtrar</h2>
        </div>
        <div className={styles.filtros}>
          <select
            value={selectedStatus}
            onChange={handleSelectChange}
            className={styles.filtros}
          >
            <option value="">Seleccionar...</option>
            <option value="0">Pendiente</option>
            <option value="1">Realizada</option>
          </select>
        </div>
      </div>
      {listaTareas.map((tarea) => (
        <div className="container">
          <div className="row">
            <div className="col-xl-6 ofsset-3">
              <ul className="list-group mb-2">
                <li className="list-group-item">{tarea.nombre}</li>
                <li className="list-group-item">{tarea.descripcion}</li>
                <li className="list-group-item">{tarea.fecha}</li>
                <li className="list-group-item">
                  {tarea.status === "1" ? "Realizada" : "Pendiente"}
                </li>
              </ul>
              <Link to={`../editarTarea/${tarea._id}/${id}`}>
                <li className="btn btn-success">Editar</li>
              </Link>
              &nbsp;
              <button
                className="btn btn-danger"
                onClick={() => {
                  borrarTarea(tarea._id);
                }}
              >
                Eliminar
              </button>
              &nbsp;
              <hr className="mt-3"></hr>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTarea;
