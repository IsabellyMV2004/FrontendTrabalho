import { Alert } from "react-bootstrap";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import {usuarios} from "../../dados/mockUsuarios";

export default function TelaCadastroUsuarios(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaDeUsuarios] = useState(usuarios);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(usuarios);

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Usuario
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaUsuarios
                    listaDeUsuarios={listaDeUsuarios}
                    setListaDeUsuarios={setListaDeUsuarios}
                    setModoEdicao={setModoEdicao}
                    setUsuarioSelecionado={setUsuarioSelecionado}
                    setExibirTabela={setExibirTabela}
                /> :
                <FormCadUsuarios
                    listaDeUsuarios={listaDeUsuarios}
                    setListaDeUsuarios={setListaDeUsuarios}
                    setModoEdicao={setModoEdicao}
                    setUsuarioSelecionado={setUsuarioSelecionado}
                    setExibirTabela={setExibirTabela}
                    modoEdicao={modoEdicao}
                    usuarioSelecionado={usuarioSelecionado}
                />
                }
            </Pagina>
        </div>
    );
}