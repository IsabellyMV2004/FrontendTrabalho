/*import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarPrivilegio, excluirPrivilegio } from "../servicos/servicoPrivilegio";

import ESTADO from "./estados";

export const buscarPrivilegios = createAsyncThunk('buscarPrivilegios', async ()=>{
    //lista de categorias
    const resultado = await consultarPrivilegio();
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"categorias recuperados com sucesso",
                "listaDePrivilegios":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os categorias do backend.",
                "listaDePrivilegios":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDePrivilegios":[]
        }
    }
});

export const apagarPrivilegio = createAsyncThunk('apagarPrivilegio', async (categoria)=>{
//dar previsibilidade ao conteúdo do payload
    //lista de categorias
    console.log(categoria);
    const resultado = await excluirPrivilegio(categoria);
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
        listaDePrivilegios:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarPrivilegios.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando categorias)"
        })
        .addCase(buscarPrivilegios.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDePrivilegios=action.payload.listaDePrivilegios;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDePrivilegios=action.payload.listaDePrivilegios;
          } 
        })
        .addCase(buscarPrivilegios.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDePrivilegios=action.payload.listaDePrivilegios;
        })
        .addCase(apagarPrivilegio.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(apagarPrivilegio.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            //altera a lista de categorias?
        })
        .addCase(apagarPrivilegio.rejected,(state,action)=>{
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
const API_URL = "https://sua-api.com/privilegios";

// Estado inicial
const initialState = {
  listaDePrivilegios: [],
  estado: ESTADO.OCIOSO,
  mensagem: "",
};

// Thunks assíncronos
export const fetchPrivilegios = createAsyncThunk(
  "privilegios/fetchPrivilegios",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Retorna a lista de privilégios.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao consultar privilégios.");
    }
  }
);

export const deletePrivilegio = createAsyncThunk(
  "privilegios/deletePrivilegio",
  async (privilegio, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${privilegio.codigo}`);
      return privilegio.codigo; // Retorna o código do privilégio excluído.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao excluir privilégio.");
    }
  }
);

export const addPrivilegio = createAsyncThunk(
  "privilegios/addPrivilegio",
  async (privilegio, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, privilegio);
      return response.data; // Retorna o privilégio cadastrado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao adicionar privilégio.");
    }
  }
);

export const updatePrivilegio = createAsyncThunk(
  "privilegios/updatePrivilegio",
  async (privilegio, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${privilegio.codigo}`, privilegio);
      return response.data; // Retorna o privilégio atualizado.
    } catch (error) {
      return rejectWithValue(error.response?.data?.mensagem || "Erro ao alterar privilégio.");
    }
  }
);

// Slice de privilégios
const privilegioSlice = createSlice({
  name: "privilegios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch privilégios
      .addCase(fetchPrivilegios.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
      })
      .addCase(fetchPrivilegios.fulfilled, (state, action) => {
        state.estado = ESTADO.OCIOSO;
        state.listaDePrivilegios = action.payload;
      })
      .addCase(fetchPrivilegios.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Delete privilégio
      .addCase(deletePrivilegio.fulfilled, (state, action) => {
        state.listaDePrivilegios = state.listaDePrivilegios.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(deletePrivilegio.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Add privilégio
      .addCase(addPrivilegio.fulfilled, (state, action) => {
        state.listaDePrivilegios.push(action.payload);
      })
      .addCase(addPrivilegio.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      })
      // Update privilégio
      .addCase(updatePrivilegio.fulfilled, (state, action) => {
        const index = state.listaDePrivilegios.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDePrivilegios[index] = action.payload;
        }
      })
      .addCase(updatePrivilegio.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload;
      });
  },
});

export default privilegioSlice.reducer;
