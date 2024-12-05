/*import { Alert } from "react-bootstrap";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import Pagina from "../layouts/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import { consultarUsuario } from "../../servicos/servicoUsuario";
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import { ContextoUsuario } from "../../App"; // Para acessar o usuário logado

export default function TelaCadastroUsuario(props) {
    const { usuario } = useContext(ContextoUsuario); // Obtem o usuário logado
    const navigate = useNavigate(); // Para redirecionar usuários não autorizados

    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        codigo: 0,
        email: "",
        senha: "",
        nome: "",
        telefone: "",
        endereco: "",
        privilegios: {}
    });
    
    useEffect(() => {
        // Verifica se o usuário logado tem nível básico
        if (usuario.privilegios.descricao === "basico") {
            alert("Acesso negado. Você não tem permissão para acessar esta página.");
            navigate("/"); // Redireciona para a página inicial ou de login
            return;
        }

        // Consulta a lista de usuários
        consultarUsuario().then((lista) => {
            setListaDeUsuarios(lista);
        });
    }, []); // O efeito é executado ao carregar o componente e quando o usuário logado muda

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Usuário</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                    />
                ) : (
                    <FormCadUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                )}
            </Pagina>
        </div>
    );
}*/


import { Alert } from "react-bootstrap";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import Pagina from "../layouts/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import { consultarUsuario, alterarUsuario } from "../../servicos/servicoUsuario"; // Certifique-se de importar a função de alterar
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import { ContextoUsuario } from "../../App"; // Para acessar o usuário logado

export default function TelaCadastroUsuario(props) {
    const { usuario } = useContext(ContextoUsuario); // Obtem o usuário logado
    const navigate = useNavigate(); // Para redirecionar usuários não autorizados

    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaDeUsuarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        codigo: 0,
        email: "",
        senha: "",
        nome: "",
        telefone: "",
        endereco: "",
        privilegios: {}
    });
    
    useEffect(() => {
        // Verifica se o usuário logado tem nível básico
        if (usuario.privilegios.descricao === "basico") {
            alert("Acesso negado. Você não tem permissão para acessar esta página.");
            navigate("/"); // Redireciona para a página inicial ou de login
            return;
        }

        // Consulta a lista de usuários
        consultarUsuario().then((lista) => {
            setListaDeUsuarios(lista);
        });
    }, [usuario, navigate]); // O efeito é executado ao carregar o componente e quando o usuário logado muda

    const manipularSubmissao = (evento) => {
        evento.preventDefault(); // Impede o recarregamento da página.
        if (evento.currentTarget.checkValidity()) {
            if (modoEdicao) {
                alterarUsuario(usuarioSelecionado).then((resultado) => {
                    if (resultado.status) {
                        // Atualiza a lista de usuários com os dados alterados
                        setListaDeUsuarios((prevLista) =>
                            prevLista.map((item) =>
                                item.codigo === usuarioSelecionado.codigo ? usuarioSelecionado : item
                            )
                        );
                        setModoEdicao(false); // Muda para o modo de visualização
                        setExibirTabela(true); // Exibe a tabela novamente
                    } else {
                        alert("Erro ao alterar usuário: " + resultado.mensagem);
                    }
                });
            }
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    };

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Usuário</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                    />
                ) : (
                    <FormCadUsuarios
                        listaDeUsuarios={listaDeUsuarios}
                        setListaDeUsuarios={setListaDeUsuarios}
                        setExibirTabela={setExibirTabela}
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        manipularSubmissao={manipularSubmissao} // Passa a função de submissão
                    />
                )}
            </Pagina>
        </div>
    );
}
