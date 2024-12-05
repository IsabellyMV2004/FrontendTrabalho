import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoSlice";
import categoriaReducer from "./categoriaSlice";
import fornecedorReducer from "./fornecedorSlice";
import clienteReducer from "./clienteSlice";
import privilegioReducer from "./privilegioSlice";
import usuarioReducer from "./usuarioSlice";

const store = configureStore({
    reducer:{
        'produto':produtoReducer,
        'categoria':categoriaReducer,
        'fornecedor':fornecedorReducer,
        'cliente':clienteReducer,
        'privilegio':privilegioReducer,
        'usuario':usuarioReducer
    }
});

export default store;