/*import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto";
import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaLogin from "./componentes/Telas/TelaLogin";
import { useState, createContext } from 'react';
import store from './redux/store';
import { Provider } from "react-redux";
import TelaCadastroFornecedor from "./componentes/Telas/TelaCadastroFornecedor";
import TelaCadastroCliente from "./componentes/Telas/TelaCadastroCliente";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";
import TelaCadastroPrivilegio from "./componentes/Telas/TelaCadastroPrivilegio";

export const ContextoUsuario = createContext();

function App() {

  const [usuario, setUsuario] = useState({
    "usuario": "",
    "logado": false
  });

  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <TelaLogin />
      </ContextoUsuario.Provider>
    );
  }
  else {
    return (
      <div className="App">
        <Provider store={store}>
          <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
            <BrowserRouter>
              { //A ordem das rotas é importante 
              }
              <Routes>
                <Route path="/produto" element={<TelaCadastroProduto />} />
                <Route path="/categoria" element={<TelaCadastroCategoria />} />
                <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
                <Route path="/cliente" element={<TelaCadastroCliente />} />
                <Route path="/usuario" element={<TelaCadastroUsuario />} />
                <Route path="/privilegio" element={<TelaCadastroPrivilegio />} />
                <Route path="/" element={<TelaMenu />} />
                <Route path="*" element={<Tela404 />} />
              </Routes>
            </BrowserRouter>
          </ContextoUsuario.Provider>
        </Provider>
      </div >
    );
  }
}

export default App;
*/

import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto";
import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaLogin from "./componentes/Telas/TelaLogin";
import TelaCadastroFornecedor from "./componentes/Telas/TelaCadastroFornecedor";
import TelaCadastroCliente from "./componentes/Telas/TelaCadastroCliente";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario";
import TelaCadastroPrivilegio from "./componentes/Telas/TelaCadastroPrivilegio";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

export const ContextoUsuario = createContext();

function PrivateRoute({ children }) {
  const { usuario } = useContext(ContextoUsuario);
  return usuario.logado ? children : <Navigate to="/" />;
}

function App() {
  const [usuario, setUsuario] = useState({
    usuario: "",
    logado: false,
  });

  // Recuperar estado do usuário do localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (userData) {
      setUsuario(userData);
    }
  }, []);

  // Salvar estado do usuário no localStorage
  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  return (
    <Provider store={store}>
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <BrowserRouter>
          {usuario.logado ? (
            <Routes>
              <Route path="/" element={<TelaMenu />} />
              <Route
                path="/produto"
                element={
                  <PrivateRoute>
                    <TelaCadastroProduto />
                  </PrivateRoute>
                }
              />
              <Route
                path="/categoria"
                element={
                  <PrivateRoute>
                    <TelaCadastroCategoria />
                  </PrivateRoute>
                }
              />
              <Route
                path="/fornecedor"
                element={
                  <PrivateRoute>
                    <TelaCadastroFornecedor />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cliente"
                element={
                  <PrivateRoute>
                    <TelaCadastroCliente />
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuario"
                element={
                  <PrivateRoute>
                    <TelaCadastroUsuario />
                  </PrivateRoute>
                }
              />
              <Route
                path="/privilegio"
                element={
                  <PrivateRoute>
                    <TelaCadastroPrivilegio />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          ) : (
            <TelaLogin />
          )}
        </BrowserRouter>
      </ContextoUsuario.Provider>
    </Provider>
  );
}

export default App;
