import { Alert } from "react-bootstrap";
import FormCadClientes from "./Formularios/FormCadCliente";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaClientes from "./Tabelas/TabelaClientes";
//import { clientes } from "../../dados/mockClientes";
import { consultarCliente } from "../../servicos/servicoCliente";

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeClientes, setListaDeClientes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        codigo:0,
        nome:"",
        endereco:"",
        telefone:""

    });

    useEffect(()=>{
        consultarCliente().then((lista)=>{
            setListaDeClientes(lista);
        });
    },[]); //listaVazia -> didMount
   

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Cliente
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaClientes listaDeClientes={listaDeClientes}
                                        setListaDeClientes={setListaDeClientes} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setClienteSelecionado={setClienteSelecionado} /> :
                        <FormCadClientes listaDeClientes={listaDeClientes}
                                         setListaDeClientes={setListaDeClientes}
                                         setExibirTabela={setExibirTabela}
                                         clienteSelecionado={clienteSelecionado}
                                         setClienteSelecionado={setClienteSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}