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
import {
  consultarPrivilegio,
  excluirPrivilegio,
  gravarPrivilegio,
  alterarPrivilegio,
} from "../servicos/servicoPrivilegio";

// Estados iniciais
const initialState = {
  listaDePrivilegios: [],
  status: "ocioso",
  mensagem: "",
};

// Thunks assíncronos
export const fetchPrivilegios = createAsyncThunk(
  "privilegios/fetchPrivilegios",
  async () => {
    const resultado = await consultarPrivilegio();
    return resultado;
  }
);

export const deletePrivilegio = createAsyncThunk(
  "privilegios/deletePrivilegio",
  async (privilegio) => {
    const resultado = await excluirPrivilegio(privilegio);
    if (resultado.status) {
      return privilegio.codigo;
    }
    throw new Error(resultado.mensagem);
  }
);

export const addPrivilegio = createAsyncThunk(
  "privilegios/addPrivilegio",
  async (privilegio) => {
    const resultado = await gravarPrivilegio(privilegio);
    if (resultado.status) {
      return resultado.privilegio;
    }
    throw new Error(resultado.mensagem);
  }
);

export const updatePrivilegio = createAsyncThunk(
  "privilegios/updatePrivilegio",
  async (privilegio) => {
    const resultado = await alterarPrivilegio(privilegio);
    if (resultado.status) {
      return privilegio;
    }
    throw new Error(resultado.mensagem);
  }
);

// Slice de privilégios
const privilegioSlice = createSlice({
  name: "privilegios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivilegios.pending, (state) => {
        state.status = "pendente";
      })
      .addCase(fetchPrivilegios.fulfilled, (state, action) => {
        state.status = "ocioso";
        state.listaDePrivilegios = action.payload;
      })
      .addCase(fetchPrivilegios.rejected, (state, action) => {
        state.status = "erro";
        state.mensagem = action.error.message;
      })
      .addCase(deletePrivilegio.fulfilled, (state, action) => {
        state.listaDePrivilegios = state.listaDePrivilegios.filter(
          (item) => item.codigo !== action.payload
        );
      })
      .addCase(addPrivilegio.fulfilled, (state, action) => {
        state.listaDePrivilegios.push(action.payload);
      })
      .addCase(updatePrivilegio.fulfilled, (state, action) => {
        const index = state.listaDePrivilegios.findIndex(
          (item) => item.codigo === action.payload.codigo
        );
        if (index !== -1) {
          state.listaDePrivilegios[index] = action.payload;
        }
      });
  },
});

export default privilegioSlice.reducer;
