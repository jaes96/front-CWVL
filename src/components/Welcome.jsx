import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.scss";
import ListTarea from "./ListTarea";
import Menu from "./menu";

const Welcome = () => {
  const [name, setName] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/user/${id}`)
        .then(({ data }) => {
          if (data.nombre) {
            setName(data.nombre);
          } else {
            navigate("/login");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id, navigate]);

  return (
    <div>
      <Menu id={id} name={name} />

      <div className={styles.welcome}>
        <ListTarea id={id} />
      </div>
    </div>
  );
};

export default Welcome;
