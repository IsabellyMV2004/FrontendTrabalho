import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import categoriaReducer from "./categoriaReducer";
import fornecedorReducer from "./fornecedorReducer";
import clienteReducer from "./clienteReducer";
import privilegioReducer from "./privilegioReducer";
import usuarioReducer from "./usuarioReducer";

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