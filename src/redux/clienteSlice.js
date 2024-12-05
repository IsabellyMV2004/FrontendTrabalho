/*import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCliente, excluirCliente } from "../servicos/servicoCliente";

import ESTADO from "./estados";

export const buscarClientes = createAsyncThunk('buscarClientes', async ()=>{
    //lista de produtos
    const resultado = await consultarCliente();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Clientes recuperados com sucesso",
                "listaDeClientes":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeClientes":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeClientes":[]
        }
    }
});

export const apagarCliente = createAsyncThunk('apagarCliente', async (produto)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de produtos
    console.log(produto);
    const resultado = await excluirCliente(produto);
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
        listaDeClientes:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarClientes.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarClientes.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
          } 
        })
        .addCase(buscarClientes.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
        })
        .addCase(apagarCliente.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarCliente.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de produtos?
        })
        .addCase(apagarCliente.rejected,(state,action)=>{
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
const API_URL = "https://sua-api.com/clientes";

// Estado inicial
const initialState = {
  listaDeCliente: [],
  estado: ESTADO.OCIOSO,
  mensagem: "",
};

// Thunks assíncronos
export const fetchClientes = createAsyncThunk(
  "clientes/fetchCliente",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna a lista de cliente.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao consultar cliente.");
    }
  }
);

export const deleteCliente = createAsyncThunk(
  "clientes/deleteCliente",
  async (cliente, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${cliente.codigo}`);
      return cliente.codigo; // Retorna o código do privilégio excluído.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao excluir privilégio.");
    }
  }
);

export const addCliente = createAsyncThunk(
  "clientes/addCliente",
  async (cliente, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, cliente);
      return response.data; // Retorna o privilégio cadastrado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao adicionar privilégio.");
    }
  }
);

export const updateCliente = createAsyncThunk(
  "clientes/updateCliente",
  async (cliente, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${cliente.codigo}`, cliente);
      return response.data; // Retorna o privilégio atualizado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao alterar privilégio.");
    }
  }
);

// Slice de cliente
const clienteSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cliente
      .addCase(fetchClientes.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.listaDeCliente = action.payload;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Delete privilégio
      .addCase(deleteCliente.fulfilled, (state, action) => {
        state.listaDeCliente = state.listaDeCliente.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(deleteCliente.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Add privilégio
      .addCase(addCliente.fulfilled, (state, action) => {
        state.listaDeCliente.push(action.payload);
      })
      .addCase(addCliente.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Update privilégio
      .addCase(updateCliente.fulfilled, (state, action) => {
        const index = state.listaDeCliente.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDeCliente[index] = action.payload;
        }
      })
      .addCase(updateCliente.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      });
  },
});

export default clienteSlice.reducer;
