/*import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, excluirUsuario } from "../servicos/servicoUsuario";

import ESTADO from "./estados";

export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async ()=>{
    //lista de produtos
    const resultado = await consultarUsuario();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Usuarios recuperados com sucesso",
                "listaDeUsuarios":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeUsuarios":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeUsuarios":[]
        }
    }
});

export const apagarUsuario = createAsyncThunk('apagarUsuario', async (produto)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de produtos
    console.log(produto);
    const resultado = await excluirUsuario(produto);
    //se for um array/lista a consulta funcionou
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

const produtoReducer = createSlice({
    name:'produto',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeUsuarios:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarUsuarios.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarUsuarios.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeUsuarios=action.payload.listaDeUsuarios;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeUsuarios=action.payload.listaDeUsuarios;
          } 
        })
        .addCase(buscarUsuarios.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeUsuarios=action.payload.listaDeUsuarios;
        })
        .addCase(apagarUsuario.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarUsuario.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de produtos?
        })
        .addCase(apagarUsuario.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
    }
});

export default produtoReducer.reducer;*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Para realizar as chamadas à API.
import ESTADO from "./estados";

// URL base da API
const API_URL = "https://sua-api.com/usuarios";

// Estado inicial
const initialState = {
  listaDeUsuarios: [],
  estado: ESTADO.OCIOSO,
  mensagem: "",
};

// Thunks assíncronos
export const fetchUsuarios = createAsyncThunk(
  "usuarios/fetchUsuarios",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna a lista de usuarios.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao consultar usuarios.");
    }
  }
);

export const deleteUsuario = createAsyncThunk(
  "usuarios/deleteUsuario",
  async (usuario, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${usuario.codigo}`);
      return usuario.codigo; // Retorna o código do usuario excluído.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao excluir usuario.");
    }
  }
);

export const addUsuario = createAsyncThunk(
  "usuarios/addUsuario",
  async (usuario, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, usuario);
      return response.data; // Retorna o usuario cadastrado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao adicionar usuario.");
    }
  }
);

export const updateUsuario = createAsyncThunk(
  "usuarios/updateUsuario",
  async (usuario, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${usuario.codigo}`, usuario);
      return response.data; // Retorna o usuario atualizado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao alterar usuario.");
    }
  }
);

// Slice de usuarios
const usuarioSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch usuarios
      .addCase(fetchUsuarios.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.listaDeUsuarios = action.payload;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Delete usuario
      .addCase(deleteUsuario.fulfilled, (state, action) => {
        state.listaDeUsuarios = state.listaDeUsuarios.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(deleteUsuario.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Add usuario
      .addCase(addUsuario.fulfilled, (state, action) => {
        state.listaDeUsuarios.push(action.payload);
      })
      .addCase(addUsuario.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Update usuario
      .addCase(updateUsuario.fulfilled, (state, action) => {
        const index = state.listaDeUsuarios.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDeUsuarios[index] = action.payload;
        }
      })
      .addCase(updateUsuario.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      });
  },
});

export default usuarioSlice.reducer;
