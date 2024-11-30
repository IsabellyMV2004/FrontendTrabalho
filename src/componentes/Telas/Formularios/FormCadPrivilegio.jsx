import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';

export default function FormCadPrivilegios(props) {
    const [privilegio, setPrivilegio] = useState(props.privilegioSelecionado);

    const [formValidado, setFormValidado] = useState(false);
    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if(form.checkValidity()){
            if (!props.modoEdicao){
                props.setListaDePrivilegios([...props.listaDePrivilegios, privilegio]);
                props.setExibirTabela(true);
                
            }
            else{
                props.setListaDePrivilegios([...props.listaDePrivilegios.filter(
                    (item) => {
                            return item.codigo !== privilegio.codigo;
                    }
                ),privilegio]);

                // não altera a ordem dos registros
                props.setListaDePrivilegios(props.listaDePrivilegios.map((item) => {
                    if(item.codigo !== privilegio.codigo)
                        return item
                    else
                        return privilegio
                }));

                //voltar para o modo 
                props.setModoEdicao(false);
                props.setPrivilegioSelecionado({
                    codigo:0,
                    descricao:""
                })
                props.setExibirTabela(true);
            }            
        }
        else{
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor = evento.target.value;
                // ... operador de espalhamento
        setPrivilegio({...privilegio, [elemento]:valor});
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
                <Button type="submit">{props.modoEdicao ? "Alterar":"Confirmar"}</Button>
                </Col>
                <Col md={{offset:1}} >
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}