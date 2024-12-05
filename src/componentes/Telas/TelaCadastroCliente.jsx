/*import { Alert } from "react-bootstrap";
import FormCadClientes from "./Formularios/FormCadCliente";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaClientes from "./Tabelas/TabelaClientes";
//import { clientes } from "../../dados/mockClientes";
import { consultarCliente } from "../../servicos/servicoCliente";

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeClientes, setListaDeClientes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        codigo:0,
        nome:"",
        endereco:"",
        telefone:""

    });

    useEffect(()=>{
        consultarCliente().then((lista)=>{
            setListaDeClientes(lista);
        });
    },[]); //listaVazia -> didMount
   

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Cliente
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaClientes listaDeClientes={listaDeClientes}
                                        setListaDeClientes={setListaDeClientes} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setClienteSelecionado={setClienteSelecionado} /> :
                        <FormCadClientes listaDeClientes={listaDeClientes}
                                         setListaDeClientes={setListaDeClientes}
                                         setExibirTabela={setExibirTabela}
                                         clienteSelecionado={clienteSelecionado}
                                         setClienteSelecionado={setClienteSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}*/

import { Table, Button } from "react-bootstrap";

export default function TabelaClientes({
  listaDeClientes,
  setListaDeClientes,
  setExibirTabela,
  setModoEdicao,
  setClienteSelecionado,
}) {
  const excluirCliente = (codigo) => {
    const novaLista = listaDeClientes.filter((cliente) => cliente.codigo !== codigo);
    setListaDeClientes(novaLista);
  };

  const editarCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setModoEdicao(true);
    setExibirTabela(false);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {listaDeClientes.map((cliente) => (
          <tr key={cliente.codigo}>
            <td>{cliente.codigo}</td>
            <td>{cliente.nome}</td>
            <td>{cliente.endereco}</td>
            <td>{cliente.telefone}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => editarCliente(cliente)}
              >
                Editar
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => excluirCliente(cliente.codigo)}
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
