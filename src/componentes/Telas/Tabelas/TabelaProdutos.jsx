import { Button, Container, Table } from "react-bootstrap";
import { gravarProduto, alterarProduto, excluirProduto, consultarProduto } from '../../../servicos/servicoProduto';

export default function TabelaProdutos(props) {

    // Função para editar o produto
    function editarProduto(produto) {
        props.setModoEdicao(true);
        props.setProdutoSelecionado(produto);
        props.setExibirTabela(false);
    }

    // Função para excluir o produto
    function excluirProduto(produto) {
        if (window.confirm(`Deseja realmente excluir o produto ${produto.descricao}?`)) {
            excluirProduto(produto)
                .then((resultado) => {
                    if (resultado.status) {
                        props.setListaDeProdutos(
                            props.listaDeProdutos.filter(item => item.codigo !== produto.codigo)
                        );
                    } else {
                        alert("Erro ao excluir produto");
                    }
                });
        }
    }

    return (
        <Container>
            <Button className="mb-3" variant="primary" onClick={() => props.setExibirTabela(false)}>
                Adicionar
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Preço de custo</th>
                        <th>Preço de venda</th>
                        <th>Qtd. em estoque</th>
                        <th>Imagem</th>
                        <th>Validade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaDeProdutos.map((produto) => (
                        <tr key={produto.codigo}>
                            <td>{produto.codigo}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.precoCusto}</td>
                            <td>{produto.precoVenda}</td>
                            <td>{produto.qtdEstoque}</td>
                            <td><img src={produto.urlImagem} alt="foto" style={{ width: 40, height: 40 }} /></td>
                            <td>{produto.dataValidade}</td>
                            <td>
                                <Button variant="warning" onClick={() => editarProduto(produto)}>Editar</Button>
                                <Button variant="danger" onClick={() => excluirProduto(produto)}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
