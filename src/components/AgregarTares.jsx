import React, { useEffect, useState } from "react";
import Menu from "./menu";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const AgregarTares = () => {
  const [inputs, setInputs] = useState({
    descripcion: "",
    nombre: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const { nombre, descripcion } = inputs;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/user/${id}`)
        .then(({ data }) => {
          if (data.nombre) {
          } else {
            navigate("/login");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id, navigate]);
  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre !== "" && descripcion !== "") {
      const Tarea = {
        nombre,
        descripcion,
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/agregar", Tarea)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({ nombre: "", descripcion: "" });
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });

      setLoading(false);
    } else {
      setMensaje("Todos los campos obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 1500);
    }
  };
  return (
    <div>
      <Menu />
      <div className={styles.flex2}>
        <div className={styles.formContainer}>
          <h2>Agregar Nueva Tarea</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className={styles.inputContainer}>
              <div className={styles.left}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  onChange={(e) => HandleChange(e)}
                  value={nombre}
                  name="nombre"
                  id="nombre"
                  type="text"
                  placeholder="Tarea..."
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.left}>
                <label htmlFor="descripcion">Descripción</label>
                <input
                  onChange={(e) => HandleChange(e)}
                  value={descripcion}
                  name="descripcion"
                  id="descripcion"
                  type="text"
                  placeholder="Descripción..."
                  autoComplete="off"
                />
              </div>
            </div>

            <button type="submit">{loading ? "Cargando..." : "Agregar"}</button>
            <button
              onClick={() => navigate(`/welcome/${id}`)}
              type="button"
              style={{ background: "red" }}
            >
              Cancelar
            </button>
          </form>
        </div>
        {mensaje && <div className={styles.toast}>{mensaje}</div>}
      </div>
    </div>
  );
};

export default AgregarTares;
