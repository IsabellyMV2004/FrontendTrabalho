import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarCategoria } from '../../../servicos/servicoCategoria';
import { gravarProduto, alterarProduto } from '../../../servicos/servicoProduto';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadProdutos(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);  // Estado do produto sendo editado ou criando
    const [formValidado, setFormValidado] = useState(false);  // Validação do formulário
    const [categorias, setCategorias] = useState([]);  // Lista de categorias
    const [temCategorias, setTemCategorias] = useState(false);  // Se há categorias carregadas

    useEffect(() => {
        consultarCategoria().then((resultado) => {
            if (Array.isArray(resultado)) {
                setCategorias(resultado);
                setTemCategorias(true);
            } else {
                toast.error("Não foi possível carregar as categorias");
            }
        }).catch(() => {
            setTemCategorias(false);
            toast.error("Não foi possível carregar as categorias");
        });
    }, []);

    // Função que lida com a seleção de categoria
    function selecionarCategoria(evento) {
        setProduto({
            ...produto,
            categoria: {
                codigo: evento.currentTarget.value
            }
        });
    }

    // Função para manipular o envio do formulário
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                // Caso não seja modo de edição, chama a função para criar produto
                gravarProduto(produto)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setExibirTabela(true);
                        } else {
                            toast.error(resultado.mensagem);
                        }
                    });
            } else {
                // Caso seja modo de edição, chama a função para alterar o produto
                alterarProduto(produto)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setListaDeProdutos(
                                props.listaDeProdutos.map((item) =>
                                    item.codigo !== produto.codigo ? item : produto
                                )
                            );
                            props.setModoEdicao(false);
                            props.setProdutoSelecionado({
                                codigo: 0,
                                descricao: "",
                                precoCusto: 0,
                                precoVenda: 0,
                                qtdEstoque: 0,
                                urlImagem: "",
                                dataValidade: "",
                                categoria: {}
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

    // Função para atualizar o estado do produto com as mudanças nos campos do formulário
    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setProduto({ ...produto, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            {/* Campos do formulário */}
            <Row className="mb-3">
                <Form.Group as={Col} controlId="descricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="descricao"
                        value={produto.descricao}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="precoCusto">
                    <Form.Label>Preço de Custo</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="precoCusto"
                        value={produto.precoCusto}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="precoVenda">
                    <Form.Label>Preço de Venda</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="precoVenda"
                        value={produto.precoVenda}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="qtdEstoque">
                    <Form.Label>Quantidade em Estoque</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        name="qtdEstoque"
                        value={produto.qtdEstoque}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="urlImagem">
                    <Form.Label>URL da Imagem</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="urlImagem"
                        value={produto.urlImagem}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="dataValidade">
                    <Form.Label>Data de Validade</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        name="dataValidade"
                        value={produto.dataValidade}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="categoria">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    as="select"
                    value={produto.categoria.codigo}
                    onChange={selecionarCategoria}
                    required
                >
                    <option value="">Selecione uma categoria</option>
                    {temCategorias ? categorias.map((categoria) => (
                        <option key={categoria.codigo} value={categoria.codigo}>
                            {categoria.descricao}
                        </option>
                    )) : <option>Carregando...</option>}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                {props.modoEdicao ? 'Alterar Produto' : 'Cadastrar Produto'}
            </Button>
        </Form>
    );
}
