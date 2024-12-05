import { Button, Spinner, Col, Form, InputGroup,
    Row
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { alterarPrivilegio, gravarPrivilegio } from '../../../servicos/servicoPrivilegio';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadPrivilegios(props) {
const [privilegio, setPrivilegio] = useState(props.privilegioSelecionado);
const [formValidado, setFormValidado] = useState(false);

   // Função para manipular a submissão do formulário
function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       // Formatar a data de validade para o formato "yyyy-mm-dd"
       const dataValidadeFormatada = new Date(privilegio.dataValidade).toLocaleDateString('pt-BR');
       privilegio.dataValidade = dataValidadeFormatada;

       if (!props.modoEdicao) {
           // Cadastrar o privilegio
           gravarPrivilegio(privilegio)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setExibirTabela(true);
                   } else {
                       toast.error(resultado.mensagem);
                   }
               });
       } else {
           // Editar o privilegio
           alterarPrivilegio(privilegio)
               .then((resultado) => {
                   if (resultado.status) {
                       props.setListaDePrivilegios(
                           props.listaDePrivilegios.map((item) => {
                               if (item.codigo !== privilegio.codigo) return item;
                               else return privilegio;
                           })
                       );

                       // Após a alteração, resetar o estado para o modo de adição
                       props.setModoEdicao(false); // Mudar para o modo de adicionar
                       
                       // Resetar o privilegio selecionado
                       props.setPrivilegioSelecionado({
                           codigo: 0,
                           descricao: ""
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
   setPrivilegio({ ...privilegio, [elemento]: valor });
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
                   value={privilegio.codigo}
                   disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do privilegio!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Descrição</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="descricao"
                   name="descricao"
                   value={privilegio.descricao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do privilegio!</Form.Control.Feedback>
           </Form.Group>
       </Row>
       <Row className='mt-2 mb-2'>
           <Col md={1}>
               <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
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
}




// PARTE DE REDUX
/*
import { useDispatch } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { addPrivilegio, updatePrivilegio } from "../../../redux/privilegioSlice";

export default function FormCadPrivilegios({
  modoEdicao,
  privilegioSelecionado,
  setExibirTabela,
}) {
  const dispatch = useDispatch();
  const [privilegio, setPrivilegio] = useState(privilegioSelecionado);

  function manipularMudanca(evento) {
    const { name, value } = evento.target;
    setPrivilegio((prev) => ({ ...prev, [name]: value }));
  }

  function manipularSubmissao(evento) {
    evento.preventDefault();
    if (modoEdicao) {
      dispatch(updatePrivilegio(privilegio));
    } else {
      dispatch(addPrivilegio(privilegio));
    }
    setExibirTabela(true);
  }

  return (
    <Form onSubmit={manipularSubmissao}>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Código</Form.Label>
            <Form.Control
              name="codigo"
              value={privilegio.codigo}
              onChange={manipularMudanca}
              disabled={modoEdicao}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              name="descricao"
              value={privilegio.descricao}
              onChange={manipularMudanca}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button type="submit">{modoEdicao ? "Alterar" : "Adicionar"}</Button>{" "}
      <Button onClick={() => setExibirTabela(true)}>Cancelar</Button>
    </Form>
  );
}*/
