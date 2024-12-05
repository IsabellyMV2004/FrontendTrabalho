/*import { Alert } from "react-bootstrap";
import FormCadPrivilegios from "./Formularios/FormCadPrivilegio";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import TabelaPrivilegios from "./Tabelas/TabelaPrivilegios";
//import { privilegios } from "../../dados/mockPrivilegios";
import { consultarPrivilegio } from "../../servicos/servicoPrivilegio";

export default function TelaCadastroPrivilegio(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDePrivilegios, setListaDePrivilegios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //const [privilegios, setPrivilegios] = useState([]);
    const [privilegioSelecionado, setPrivilegioSelecionado] = useState({
        codigo:0,
        descricao:""

    });

    useEffect(()=>{
        consultarPrivilegio().then((lista)=>{
            setListaDePrivilegios(lista);
        });
    },[]); //listaVazia -> didMount
   

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Privilegio
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaPrivilegios listaDePrivilegios={listaDePrivilegios}
                                        setListaDePrivilegios={setListaDePrivilegios} 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setPrivilegioSelecionado={setPrivilegioSelecionado} /> :
                        <FormCadPrivilegios listaDePrivilegios={listaDePrivilegios}
                                         setListaDePrivilegios={setListaDePrivilegios}
                                         setExibirTabela={setExibirTabela}
                                         privilegioSelecionado={privilegioSelecionado}
                                         setPrivilegioSelecionado={setPrivilegioSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}*/



import { useState } from "react";
import TabelaPrivilegios from "./Tabelas/TabelaPrivilegios";
import FormCadPrivilegios from "./Formularios/FormCadPrivilegio";
import { useSelector } from "react-redux";

export default function TelaCadastroPrivilegio() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [privilegioSelecionado, setPrivilegioSelecionado] = useState({
    codigo: "",
    descricao: ""
  });

  const { listaDePrivilegios } = useSelector((state) => state.privilegios);

  return (
    <>
      {exibirTabela ? (
        <TabelaPrivilegios
          setExibirTabela={setExibirTabela}
          setModoEdicao={setModoEdicao}
          setPrivilegioSelecionado={setPrivilegioSelecionado}
        />
      ) : (
        <FormCadPrivilegios
          listaDePrivilegios={listaDePrivilegios}
          setExibirTabela={setExibirTabela}
          modoEdicao={modoEdicao}
          setModoEdicao={setModoEdicao}
          privilegioSelecionado={privilegioSelecionado}
          setPrivilegioSelecionado={setPrivilegioSelecionado}
        />
      )}
    </>
  );
}
