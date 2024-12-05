/*import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarProduto, excluirProduto } from "../servicos/servicoProduto";

import ESTADO from "./estados";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async ()=>{
    //lista de produtos
    const resultado = await consultarProduto();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Produtos recuperados com sucesso",
                "listaDeProdutos":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do backend.",
                "listaDeProdutos":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeProdutos":[]
        }
    }
});

export const apagarProduto = createAsyncThunk('apagarProduto', async (produto)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de produtos
    console.log(produto);
    const resultado = await excluirProduto(produto);
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
        listaDeProdutos:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarProdutos.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)"
        })
        .addCase(buscarProdutos.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
          } 
        })
        .addCase(buscarProdutos.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeProdutos=action.payload.listaDeProdutos;
        })
        .addCase(apagarProduto.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarProduto.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de produtos?
        })
        .addCase(apagarProduto.rejected,(state,action)=>{
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
const API_URL = "https://backend-trabalho.vercel.app/produtos";

// Estado inicial
const initialState = {
  listaDeProdutos: [],
  estado: ESTADO.OCIOSO,
  mensagem: "",
};

// Thunks assíncronos
export const fetchProdutos = createAsyncThunk(
  "produtos/fetchProdutos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna a lista de produtos.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao consultar produtos.");
    }
  }
);

export const deleteProduto = createAsyncThunk(
  "produtos/deleteProduto",
  async (produto, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${produto.codigo}`);
      return produto.codigo; // Retorna o código do produto excluído.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao excluir produto.");
    }
  }
);

export const addProduto = createAsyncThunk(
  "produtos/addProduto",
  async (produto, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, produto);
      return response.data; // Retorna o produto cadastrado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao adicionar produto.");
    }
  }
);

export const updateProduto = createAsyncThunk(
  "produtos/updateProduto",
  async (produto, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${produto.codigo}`, produto);
      return response.data; // Retorna o produto atualizado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao alterar produto.");
    }
  }
);

// Slice de produtos
const produtoSlice = createSlice({
  name: "produtos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch produtos
      .addCase(fetchProdutos.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
      })
      .addCase(fetchProdutos.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.listaDeProdutos = action.payload;
      })
      .addCase(fetchProdutos.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Delete produto
      .addCase(deleteProduto.fulfilled, (state, action) => {
        state.listaDeProdutos = state.listaDeProdutos.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(deleteProduto.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Add produto
      .addCase(addProduto.fulfilled, (state, action) => {
        state.listaDeProdutos.push(action.payload);
      })
      .addCase(addProduto.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Update produto
      .addCase(updateProduto.fulfilled, (state, action) => {
        const index = state.listaDeProdutos.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDeProdutos[index] = action.payload;
        }
      })
      .addCase(updateProduto.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      });
  },
});

export default produtoSlice.reducer;
