import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from "axios";
import Menu from "./menu";

const EditarTarea = () => {
  const [inputs, setInputs] = useState({
    descripcion: "",
    nombre: "",
    status: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const { nombre, descripcion, status } = inputs;
  const navigate = useNavigate();
  const { idTarea, id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(`https://examen-back.onrender.com/user/${id}`)
        .then(({ data }) => {
          if (data.nombre) {
          } else {
            navigate("/login");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id, navigate]);

  useEffect(() => {
    if (idTarea) {
      axios
        .get(`https://examen-back.onrender.com/getTareaEdit/${idTarea}`)
        .then(({ data }) => {
          console.log(data);
          setInputs({
            nombre: data.nombre,
            descripcion: data.descripcion,
            status: data.status,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [idTarea]);
  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre !== "" && descripcion !== "" && status !== "") {
      const Tarea = {
        idTarea,
        nombre,
        descripcion,
        status,
      };
      setLoading(true);
      await axios
        .post("https://examen-back.onrender.com/actualizar", Tarea)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);

          setTimeout(() => {
            setMensaje("");
          }, 1500);
        })
        .catch((error) => {
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
          <h2>Editar Tarea</h2>
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

            <div className={styles.inputContainer}>
              <div className={styles.left}>
                <label htmlFor="status">Status</label>
                <select
                  onChange={(e) => HandleChange(e)}
                  value={status}
                  name="status"
                  id="status"
                  type="text"
                  placeholder="Status..."
                  autoComplete="off"
                >
                  <option value="0">Pendiente</option>
                  <option value="1">Realizada</option>
                </select>
              </div>
            </div>

            <button type="submit">{loading ? "Cargando..." : "Guardar"}</button>
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

export default EditarTarea;
