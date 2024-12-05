/*import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarFornecedor, excluirFornecedor } from "../servicos/servicoFornecedor";

import ESTADO from "./estados";

export const buscarFornecedores = createAsyncThunk('buscarFornecedores', async ()=>{
    //lista de produtos
    const resultado = await consultarFornecedor();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Fornecedores recuperados com sucesso",
                "listaDeFornecedores":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeFornecedores":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeFornecedores":[]
        }
    }
});

export const apagarFornecedor = createAsyncThunk('apagarFornecedor', async (produto)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de produtos
    console.log(produto);
    const resultado = await excluirFornecedor(produto);
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
        listaDeFornecedores:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarFornecedores.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarFornecedores.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
          } 
        })
        .addCase(buscarFornecedores.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
        })
        .addCase(apagarFornecedor.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarFornecedor.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de produtos?
        })
        .addCase(apagarFornecedor.rejected,(state,action)=>{
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
const API_URL = "https://backend-trabalho.vercel.app/fornecedores";

// Estado inicial
const initialState = {
  listaDeFornecedores: [],
  estado: ESTADO.OCIOSO,
  mensagem: "",
};

// Thunks assíncronos
export const fetchFornecedores = createAsyncThunk(
  "fornecedores/fetchFornecedores",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna a lista de fornecedores.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao consultar fornecedores.");
    }
  }
);

export const deleteFornecedor = createAsyncThunk(
  "fornecedores/deleteFornecedor",
  async (fornecedor, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${fornecedor.codigo}`);
      return fornecedor.codigo; // Retorna o código do fornecedor excluído.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao excluir fornecedor.");
    }
  }
);

export const addFornecedor = createAsyncThunk(
  "fornecedores/addFornecedor",
  async (fornecedor, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, fornecedor);
      return response.data; // Retorna o fornecedor cadastrado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao adicionar fornecedor.");
    }
  }
);

export const updateFornecedor = createAsyncThunk(
  "fornecedores/updateFornecedor",
  async (fornecedor, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${fornecedor.codigo}`, fornecedor);
      return response.data; // Retorna o fornecedor atualizado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao alterar fornecedor.");
    }
  }
);

// Slice de fornecedores
const fornecedorSlice = createSlice({
  name: "fornecedores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch fornecedores
      .addCase(fetchFornecedores.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
      })
      .addCase(fetchFornecedores.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.listaDeFornecedores = action.payload;
      })
      .addCase(fetchFornecedores.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Delete fornecedor
      .addCase(deleteFornecedor.fulfilled, (state, action) => {
        state.listaDeFornecedores = state.listaDeFornecedores.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(deleteFornecedor.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Add fornecedor
      .addCase(addFornecedor.fulfilled, (state, action) => {
        state.listaDeFornecedores.push(action.payload);
      })
      .addCase(addFornecedor.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Update fornecedor
      .addCase(updateFornecedor.fulfilled, (state, action) => {
        const index = state.listaDeFornecedores.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDeFornecedores[index] = action.payload;
        }
      })
      .addCase(updateFornecedor.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      });
  },
});

export default fornecedorSlice.reducer;
