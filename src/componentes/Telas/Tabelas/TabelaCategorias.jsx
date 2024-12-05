import { Button, Container, Table } from "react-bootstrap";
import { excluirCategoria } from "../../../servicos/servicoCategoria";

export default function TabelaCategorias(props) {

    function editarCategoria(categoria){
        props.setModoEdicao(true);
        props.setCategoriaSelecionado(categoria)
        props.setExibirTabela(false);
    }

    function excluirCategoriaFrontEnd(categoria){
        if(window.confirm("Deseja realmente excluir o categoria " + categoria.descricao)){
            //abordagem utilizando a sintaxe permitida da linguagem
            excluirCategoria(categoria).then((resposta)=>{
                if(resposta.status){
                    props.setListaDeCategorias(props.listaDeCategorias.filter(
                        (item)=>{
                                    return item.codigo != categoria.codigo     
                                }));
                }
                else{
                    window.alert("Não foi possivel excluir o categoria: "+ resposta.mensagem);
                }
            })
            
        }
    }

    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary"
                    onClick={() => {
                        props.setExibirTabela(false);
                    }}>
                    Adicionar
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </thead>
                    <tbody>
                        {
                            props.listaDeCategorias?.map((categoria) => {
                                return (
                                    <tr>
                                        <td>{categoria.codigo}</td>
                                        <td>{categoria.descricao}</td>
                                        <td>
                                            <Button onClick={()=>{
                                                editarCategoria(categoria);
                                            }}variant="warning">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                </svg>
                                            </Button> <Button onClick={ ()=> {
                                                excluirCategoriaFrontEnd(categoria);
                                            }} variant="danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>           
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <p>Quatidade de categorias cadastrados: {props.listaDeCategorias.length}</p>
            </Container>
        </>
    );
}



// PARTE DE REDUX
/*
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import ESTADO from "../../../redux/estados"; // Ajuste o caminho se necessário
import { useEffect } from "react";
import { fetchCategorias, deleteCategoria } from "../../../redux/categoriaSlice";

export default function TabelaCategorias({ setExibirTabela, setModoEdicao, setCategoriaSelecionado }) {
  const dispatch = useDispatch();
  const { listaDeCategorias, estado, mensagem } = useSelector((state) => state.categorias);

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  function editarCategoria(categoria) {
    setModoEdicao(true);
    setCategoriaSelecionado(categoria);
    setExibirTabela(false);
  }

  function excluirCategoriaHandler(categoria) {
    if (window.confirm(`Deseja realmente excluir o privilégio ${categoria.descricao}?`)) {
      dispatch(deleteCategoria(categoria));
    }
  }

  if (estado === ESTADO.PENDENTE) {
    return <p>Carregando categorias...</p>;
  }

  if (estado === ESTADO.ERRO) {
    return <p>Erro: {mensagem}</p>;
  }

  return (
    <Container>
      <Button className="mb-3" onClick={() => setExibirTabela(false)}>
        Adicionar
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaDeCategorias.map((categoria) => (
            <tr key={categoria.codigo}>
              <td>{categoria.codigo}</td>
              <td>{categoria.descricao}</td>
              <td>

              <Button onClick={()=>{
                    editarCategoria(categoria);
                }}variant="warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </Button> <Button onClick={ ()=> {
                    excluirCategoriaHandler(categoria);
                }} variant="danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>           
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Quantidade de categorias cadastrados: {listaDeCategorias.length}</p>
    </Container>
  );
}
*/

