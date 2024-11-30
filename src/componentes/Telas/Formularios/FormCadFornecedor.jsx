import { Button, Spinner, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { consultarProduto } from "../../../servicos/servicoProduto";
import { alterarFornecedor, gravarFornecedor } from "../../../servicos/servicoFornecedor";

import toast, { Toaster } from "react-hot-toast";

export default function FormCadFornecedores(props) {
    const [fornecedor, setFornecedor] = useState({
        ...props.fornecedorSelecionado,
        produtos: props.fornecedorSelecionado?.produtos || [] // Inicializa com os produtos existentes ou vazio
    });
    const [formValidado, setFormValidado] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [temProdutos, setTemProdutos] = useState(false);

    useEffect(() => {
        consultarProduto()
            .then((resultado) => {
                if (Array.isArray(resultado)) {
                    setProdutos(resultado);
                    setTemProdutos(true);
                } else {
                    toast.error("Não foi possível carregar os produtos");
                }
            })
            .catch(() => {
                setTemProdutos(false);
                toast.error("Não foi possível carregar os produtos");
            });
    }, []); // didMount

    function selecionarProdutos(evento) {
        const options = evento.target.options;
        const produtosSelecionados = [];
        for (const option of options) {
            if (option.selected) {
                produtosSelecionados.push({
                    codigo: option.value,
                    descricao: option.text
                });
            }
        }

        setFornecedor({
            ...fornecedor,
            produtos: produtosSelecionados
        });
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                gravarFornecedor(fornecedor).then((resultado) => {
                    if (resultado.status) {
                        props.setExibirTabela(true);
                    } else {
                        toast.error(resultado.mensagem);
                    }
                });
            } else {
                alterarFornecedor(fornecedor).then((resultado) => {
                    if (resultado.status) {
                        props.setListaDeFornecedores(
                            props.listaDeFornecedores.map((item) =>
                                item.codigo === fornecedor.codigo ? fornecedor : item
                            )
                        );
                        props.setModoEdicao(false); // Voltar ao modo de adição
                        props.setFornecedorSelecionado({
                            codigo: 0,
                            nome: "",
                            endereco: "",
                            contato: "",
                            cpf: "",
                            produtos: []
                        });
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
        setFornecedor({ ...fornecedor, [elemento]: valor });
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
                        value={fornecedor.codigo}
                        disabled={props.modoEdicao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o código do fornecedor!
                    </Form.Control.Feedback>
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
                        value={fornecedor.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o nome do fornecedor!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={fornecedor.endereco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o endereço do fornecedor!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Contato</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="contato"
                        name="contato"
                        value={fornecedor.contato}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o contato do fornecedor!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md={12}>
                    <Form.Label>Produtos:</Form.Label>
                    <Form.Select
                        id="produtos"
                        name="produtos"
                        multiple
                        onChange={selecionarProdutos}
                    >
                        {produtos.map((produto) => (
                            <option
                                key={produto.codigo}
                                value={produto.codigo}
                                selected={fornecedor.produtos.some(
                                    (p) => p.codigo === produto.codigo
                                )}
                            >
                                {produto.descricao}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={1}>
                    {!temProdutos ? (
                        <Spinner className="mt-4" animation="border" variant="success" />
                    ) : (
                        ""
                    )}
                </Form.Group>
            </Row>
            <Row className="mt-2 mb-2">
                <Col md={1}>
                    <Button type="submit" disabled={!temProdutos}>
                        {props.modoEdicao ? "Alterar" : "Confirmar"}
                    </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button
                        onClick={() => {
                            props.setExibirTabela(true);
                        }}
                    >
                        Voltar
                    </Button>
                </Col>
            </Row>
            <Toaster position="top-right" />
        </Form>
    );
}
