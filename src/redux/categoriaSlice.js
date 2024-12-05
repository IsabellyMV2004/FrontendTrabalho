/*import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCategoria, excluirCategoria } from "../servicos/servicoCategoria";

import ESTADO from "./estados";

export const buscarCategorias = createAsyncThunk('buscarCategorias', async ()=>{
    //lista de categorias
    const resultado = await consultarCategoria();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"categorias recuperados com sucesso",
                "listaDeCategorias":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os categorias do backend.",
                "listaDeCategorias":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeCategorias":[]
        }
    }
});

export const apagarCategoria = createAsyncThunk('apagarCategoria', async (categoria)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de categorias
    console.log(categoria);
    const resultado = await excluirCategoria(categoria);
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

const categoriaReducer = createSlice({
    name:'categoria',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeCategorias:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarCategorias.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando categorias)"
        })
        .addCase(buscarCategorias.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
        })
        .addCase(buscarCategorias.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
        })
        .addCase(apagarCategoria.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarCategoria.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de categorias?
        })
        .addCase(apagarCategoria.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
    }
});

export default categoriaReducer.reducer;*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Para realizar as chamadas à API.
import ESTADO from "./estados";

// URL base da API
const API_URL = "https://backend-trabalho.vercel.app/categorias";

// Estado inicial
const initialState = {
  listaDeCategorias: [],
  estado: ESTADO.OCIOSO,
  mensagem: "",
};

// Thunks assíncronos
export const fetchCategorias = createAsyncThunk(
  "categorias/fetchCategorias",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna a lista de categorias.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao consultar categorias.");
    }
  }
);

export const deleteCategoria = createAsyncThunk(
  "categorias/deleteCategoria",
  async (categoria, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${categoria.codigo}`);
      return categoria.codigo; // Retorna o código do categoria excluído.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao excluir categoria.");
    }
  }
);

export const addCategoria = createAsyncThunk(
  "categorias/addCategoria",
  async (categoria, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, categoria);
      return response.data; // Retorna o categoria cadastrado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao adicionar categoria.");
    }
  }
);

export const updateCategoria = createAsyncThunk(
  "categorias/updateCategoria",
  async (categoria, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${categoria.codigo}`, categoria);
      return response.data; // Retorna o categoria atualizado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao alterar categoria.");
    }
  }
);

// Slice de categoria
const categoriaSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categoria
      .addCase(fetchCategorias
.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
      })
      .addCase(fetchCategorias
.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.listaDeCategorias
 = action.payload;
      })
      .addCase(fetchCategorias
.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Delete categoria
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.listaDeCategorias
 = state.listaDeCategorias
.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(deleteCategoria.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Add categoria
      .addCase(addCategoria.fulfilled, (state, action) => {
        state.listaDeCategorias
.push(action.payload);
      })
      .addCase(addCategoria.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Update categoria
      .addCase(updateCategoria.fulfilled, (state, action) => {
        const index = state.listaDeCategorias
.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDeCategorias
    [index] = action.payload;
        }
      })
      .addCase(updateCategoria.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      });
  },
});

export default categoriaSlice.reducer;
