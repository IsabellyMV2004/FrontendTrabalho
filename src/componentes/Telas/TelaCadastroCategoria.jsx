import { Alert } from "react-bootstrap";
import FormCadCategorias from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
//import { categorias } from "../../dados/mockCategorias";
import { consultarCategoria } from "../../servicos/servicoCategoria";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeCategorias, setListaDeCategorias] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionado, setCategoriaSelecionado] = useState({
        codigo:0,
        descricao:""

    });

    useEffect(()=>{
        consultarCategoria().then((lista)=>{
            setListaDeCategorias(lista);
        });
    },[]); //listaVazia -> didMount
   

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
                        <TabelaCategorias listaDeCategorias={listaDeCategorias}
                                        setListaDeCategorias={setListaDeCategorias} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setCategoriaSelecionado={setCategoriaSelecionado} /> :
                        <FormCadCategorias listaDeCategorias={listaDeCategorias}
                                         setListaDeCategorias={setListaDeCategorias}
                                         setExibirTabela={setExibirTabela}
                                         categoriaSelecionado={categoriaSelecionado}
                                         setCategoriaSelecionado={setCategoriaSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}