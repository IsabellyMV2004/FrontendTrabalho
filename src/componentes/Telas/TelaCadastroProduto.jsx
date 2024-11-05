import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formularios/FormCadProduto";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { consultarProduto } from "../../servicos/servicoProduto";

export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);  // Controle da exibição da tabela ou formulário
    const [listaDeProdutos, setListaDeProdutos] = useState([]);  // Lista de produtos
    const [modoEdicao, setModoEdicao] = useState(false);  // Modo de edição
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        qtdEstoque: 0,
        urlImagem: "",
        dataValidade: "",
        categoria: {}
    });  // Produto selecionado para edição

    // Carregar os produtos do backend
    useEffect(() => {
        consultarProduto().then((lista) => {
            setListaDeProdutos(lista);
        });
    }, []); // ListaVazia -> didMount

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Produto</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos
                            listaDeProdutos={listaDeProdutos}
                            setListaDeProdutos={setListaDeProdutos}
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setProdutoSelecionado={setProdutoSelecionado}
                        /> :
                        <FormCadProdutos
                            listaDeProdutos={listaDeProdutos}
                            setListaDeProdutos={setListaDeProdutos}
                            setExibirTabela={setExibirTabela}
                            produtoSelecionado={produtoSelecionado}
                            setProdutoSelecionado={setProdutoSelecionado}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </div>
    );
}
