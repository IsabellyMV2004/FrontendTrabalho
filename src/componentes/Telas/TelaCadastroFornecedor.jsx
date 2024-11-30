import { Alert } from "react-bootstrap";
import FormCadFornecedores from "./Formularios/FormCadFornecedor";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
import {fornecedores} from "../../dados/mockFornecedores";

export default function TelaCadastroFornecedor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeFornecedores, setListaDeFornecedores] = useState(fornecedores);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(fornecedores);

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Fornecedor
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaFornecedores
                    listaDeFornecedores={listaDeFornecedores}
                    setListaDeFornecedores={setListaDeFornecedores}
                    setModoEdicao={setModoEdicao}
                    setFornecedorSelecionado={setFornecedorSelecionado}
                    setExibirTabela={setExibirTabela}
                /> :
                <FormCadFornecedores
                    listaDeFornecedores={listaDeFornecedores}
                    setListaDeFornecedores={setListaDeFornecedores}
                    setModoEdicao={setModoEdicao}
                    setFornecedorSelecionado={setFornecedorSelecionado}
                    setExibirTabela={setExibirTabela}
                    modoEdicao={modoEdicao}
                    fornecedorSelecionado={fornecedorSelecionado}
                />
                }
            </Pagina>
        </div>
    );
}