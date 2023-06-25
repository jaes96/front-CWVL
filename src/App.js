import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import AgregarTarea from "./components/AgregarTares";
import EditarTarea from "./components/EditarTarea";
import styles from "./App.module.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome/:id" element={<Welcome />} />
          <Route path="/agregarTarea/:id" element={<AgregarTarea />} />
          <Route path="/editarTarea/:idTarea/:id" element={<EditarTarea />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
