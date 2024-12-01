import { Alert } from "react-bootstrap";
import FormCadFornecedores from "./Formularios/FormCadFornecedor";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
//import { usuarios } from "../../dados/mockFornecedores";
import { consultarFornecedor } from "../../servicos/servicoFornecedor";

export default function TelaCadastroFornecedor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeFornecedores, setListaDeFornecedores] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [usuarios, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        codigo:0,
        email:"",
        senha:"",
        nome:"",
        telefone:"",
        endereco:"",
        privilegios: {}

    });

    useEffect(()=>{
        consultarFornecedor().then((lista)=>{
            setListaDeFornecedores(lista);
        });
    },[]); //listaVazia -> didMount
   

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
                        <TabelaFornecedores listaDeFornecedores={listaDeFornecedores}
                                        setListaDeFornecedores={setListaDeFornecedores} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setFornecedorSelecionado={setFornecedorSelecionado} /> :
                        <FormCadFornecedores listaDeFornecedores={listaDeFornecedores}
                                         setListaDeFornecedores={setListaDeFornecedores}
                                         setExibirTabela={setExibirTabela}
                                         fornecedorSelecionado={fornecedorSelecionado}
                                         setFornecedorSelecionado={setFornecedorSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}