/*import { Button, Spinner, Col, Form, InputGroup,
         Row
 } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarPrivilegio } from '../../../servicos/servicoPrivilegio';
import { alterarUsuario, gravarUsuario } from '../../../servicos/servicoUsuario';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [privilegios, setPrivilegios] = useState([]);
    const [temPrivilegios, setTemPrivilegios] = useState(false);

    useEffect(()=>{
        consultarPrivilegio().then((resultado)=>{
            if (Array.isArray(resultado)){
                setPrivilegios(resultado);
                setTemPrivilegios(true);
            }
            else{
                toast.error("Não foi possível carregar as privilegios");
            }
        }).catch((erro)=>{
            setTemPrivilegios(false);
            toast.error("Não foi possível carregar as privilegios");
        });
        
    },[]); //didMount

    function selecionarPrivilegio(evento){
        setUsuario({...usuario, 
                       privilegios:{
                        codigo: evento.currentTarget.value

                       }});
    }
    
        // Função para manipular a submissão do formulário
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            // Formatar a data de validade para o formato "yyyy-mm-dd"

            if (!props.modoEdicao) {
                // Cadastrar o usuario
                gravarUsuario(usuario)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setExibirTabela(true);
                        } else {
                            toast.error(resultado.mensagem);
                        }
                    });
            } else {
                // Editar o usuario
                alterarUsuario(usuario)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setListaDeUsuarios(
                                props.listaDeUsuarios.map((item) => {
                                    if (item.codigo !== usuario.codigo) return item;
                                    else return usuario;
                                })
                            );

                            // Após a alteração, resetar o estado para o modo de adição
                            props.setModoEdicao(false); // Mudar para o modo de adicionar
                            
                            // Resetar o usuario selecionado
                            props.setUsuarioSelecionado({
                                codigo: 0,
                                email: "",
                                senha: "",
                                nome: "",
                                telefone: "",
                                endereco: "",
                                privilegios: {}
                            });

                            // Mostrar a tabela novamente
                            props.setExibirTabela(true);
                        } else {
                            toast.error(resultado.mensagem);
                        }
                    });
            }
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={usuario.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={usuario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Row className="mb-4">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="email"
                            name="email"
                            value={usuario.email}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, informe o email do usuario!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control 
                        type="password" 
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca} 
                    />
                </Form.Group>
                <Row className="mb-4">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={usuario.telefone}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, informe o telefone do usuario!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Row>
            <Row className="mb-4">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Endereco</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={usuario.endereco}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, informe o endereco do usuario!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
            <Row className="mb-4">
        <Form.Group as={Col} md="4">
            </Form.Group>
                <Form.Group as={Col} md={7}>
                    <Form.Label>Privilegio:</Form.Label>
                    <Form.Select id='privilegios' 
                                 name='privilegios'
                                 onChange={selecionarPrivilegio}>
                        {// criar em tempo de execução as privilegios existentes no banco de dados
                            privilegios.map((privilegios) =>{
                                return <option value={privilegios.codigo}>
                                            {privilegios.nome}
                                       </option>
                            })
                        }
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={1}>
                    {
                      !temPrivilegios ? <Spinner className='mt-4' animation="border" variant="success" />
                      : ""
                    }
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit" disabled={!temPrivilegios}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
    );
}*/

import { Button, Spinner, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarPrivilegio } from '../../../servicos/servicoPrivilegio';
import { alterarUsuario, gravarUsuario } from '../../../servicos/servicoUsuario';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [privilegios, setPrivilegios] = useState([]);
    const [temPrivilegios, setTemPrivilegios] = useState(false);

    useEffect(() => {
        // Carregar privilégios do backend
        consultarPrivilegio()
            .then((resultado) => {
                console.log(resultado);  // Depuração: verificar resposta do backend
                if (Array.isArray(resultado)) {
                    setPrivilegios(resultado);
                    setTemPrivilegios(true);
                } else {
                    toast.error("Não foi possível carregar os privilégios");
                }
            })
            .catch((erro) => {
                setTemPrivilegios(false);
                toast.error("Não foi possível carregar os privilégios");
            });
    }, []); // Executar apenas uma vez quando o componente for montado

    function selecionarPrivilegio(evento) {
        const codigoPrivilegio = evento.currentTarget.value;
        console.log(codigoPrivilegio);  // Depuração: verificar valor selecionado

        // Atualizar o estado do usuário com o privilégio selecionado
        setUsuario({
            ...usuario,
            privilegios: {
                codigo: codigoPrivilegio
            }
        });
    }

   
   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
        // Formatar a data de validade para o formato "yyyy-mm-dd"
 
        if (!props.modoEdicao) {
            // Cadastrar o usuario
            gravarUsuario(usuario)
                .then((resultado) => {
                    if (resultado.status) {
                        props.setExibirTabela(true);
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
        } else {
            // Editar o usuario
            alterarUsuario(usuario)
                .then((resultado) => {
                    if (resultado.status) {
                        props.setListaDeUsuarios(
                            props.listaDeUsuarios.map((item) => {
                                if (item.codigo !== usuario.codigo) return item;
                                else return usuario;
                            })
                        );
 
                        // Após a alteração, resetar o estado para o modo de adição
                        props.setModoEdicao(false); // Mudar para o modo de adicionar
                        
                        // Resetar o usuario selecionado
                        props.setUsuarioSelecionado({
                            codigo: 0,
                            email: "",
                            senha: "",
                            nome: "",
                            telefone: "",
                            endereco: "",
                            privilegios: {}
                        });
 
                        // Mostrar a tabela novamente
                        props.setExibirTabela(true);
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
        }
    } else {
        setFormValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
 }
 
 function manipularMudanca(evento) {
    const elemento = evento.target.name;
    const valor = evento.target.value;
    setUsuario({ ...usuario, [elemento]: valor });
 }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={usuario.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={usuario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="email"
                        name="email"
                        value={usuario.email}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o email do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        value={usuario.senha}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={usuario.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Endereco</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={usuario.endereco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereco do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Privilegio:</Form.Label>
                    <Form.Select
                        id='privilegios'
                        name='privilegios'
                        onChange={selecionarPrivilegio}
                        value={usuario.privilegios.codigo || ''}
                    >
                        {
                            temPrivilegios ?
                                privilegios.map((privilegios) => (
                                    <option key={privilegios.codigo} value={privilegios.codigo}>
                                        {privilegios.descricao}
                                    </option>
                                ))
                                : <option>Carregando...</option>
                        }
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit" disabled={!temPrivilegios}>
                        {props.modoEdicao ? "Alterar" : "Confirmar"}
                    </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>

            <Toaster position="top-right" />
        </Form>
    );
}

