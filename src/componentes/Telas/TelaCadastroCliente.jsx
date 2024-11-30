import { Alert } from "react-bootstrap";
import FormCadClientes from "./Formularios/FormCadClientes";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaClientes from "./Tabelas/TabelaClientes";
import {clientes} from "../../dados/mockClientes";

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeClientes, setListaDeClientes] = useState(clientes);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(clientes);

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
                    <TabelaClientes
                    listaDeClientes={listaDeClientes}
                    setListaDeClientes={setListaDeClientes}
                    setModoEdicao={setModoEdicao}
                    setClienteSelecionado={setClienteSelecionado}
                    setExibirTabela={setExibirTabela}
                /> :
                <FormCadClientes
                    listaDeClientes={listaDeClientes}
                    setListaDeClientes={setListaDeClientes}
                    setModoEdicao={setModoEdicao}
                    setClienteSelecionado={setClienteSelecionado}
                    setExibirTabela={setExibirTabela}
                    modoEdicao={modoEdicao}
                    clienteSelecionado={clienteSelecionado}
                />
                }
            </Pagina>
        </div>
    );
}