import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const Menu = ({ id, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navega = () => {
    navigate(`../agregarTarea/${id}`);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_logo}>{name}</div>
      <div className={`${styles.nav_items} ${isOpen && styles.open}`}>
        <button onClick={() => navega()}> Agregar Tarea</button>

        <a href="https://fastidious-rabanadas-5bf7a5.netlify.app/login">
          {" "}
          Salir
        </a>
      </div>
      <div
        className={`${styles.nav_toggle} ${isOpen && styles.open}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Menu;
