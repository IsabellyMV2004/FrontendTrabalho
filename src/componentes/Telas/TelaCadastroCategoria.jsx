import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
import {categorias} from "../../dados/mockCategorias";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeCategorias, setListaDeCategorias] = useState(categorias);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaSelecionado, setCategoriaSelecionado] = useState(categorias);

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaCategorias
                    listaDeCategorias={listaDeCategorias}
                    setListaDeCategorias={setListaDeCategorias}
                    setModoEdicao={setModoEdicao}
                    setCategoriaSelecionado={setCategoriaSelecionado}
                    setExibirTabela={setExibirTabela}
                /> :
                <FormCadCategorias
                    listaDeCategorias={listaDeCategorias}
                    setListaDeCategorias={setListaDeCategorias}
                    setModoEdicao={setModoEdicao}
                    setCategoriaSelecionado={setCategoriaSelecionado}
                    setExibirTabela={setExibirTabela}
                    modoEdicao={modoEdicao}
                    categoriaSelecionado={categoriaSelecionado}
                />
                }
            </Pagina>
        </div>
    );
}