import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const Menu = ({ id, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navega = () => {
    navigate(`../agregarTarea/${id}`);
  };
  const salir = () => {
    navigate(`../login`);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_logo}>{name}</div>
      <div className={`${styles.nav_items} ${isOpen && styles.open}`}>
        <button onClick={() => navega()}> Agregar Tarea</button>

        <button onClick={() => salir()}> Salir</button>
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
