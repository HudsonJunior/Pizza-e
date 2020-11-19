import React from "react"
import {Form} from "react-bootstrap"
import {Button} from "react-bootstrap"
import {FiPlus} from "react-icons/fi";



const RegistrarPedido = () => {

    return (
        <>
            <h1>Registro de Pedido </h1>
            <Form > 
                <Form.Group controlId="formaPagamento">
                    <Form.Label>Forma de Pagamento</Form.Label>
                    <Form.Control as="select" defaultValue="Selecione..." className="col-2 mb-3">
                        <option>Selecione...</option>
                        <option>Dinheiro</option>
                        <option>Cartão de Débito</option>
                        <option>Cartão de Crédito</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formaExpedicao">
                    <Form.Label>Forma de Expedição  </Form.Label>
                    <Form.Control as="select" defaultValue="Selecione..." className="col-2 mb-3">
                        <option>Selecione...</option>
                        <option>Retirar no Balcão</option>
                        <option>Entrega na residência</option>
                    </Form.Control>
                    <Button variant="success">
                        <FiPlus size={22} color="fff"/>
                        Cadastrar Cliente
                    </Button>
                </Form.Group>

                <Form.Group controlId="ObservacoesPedido">
                    <Form.Label>Observações</Form.Label>
                    <Form.Control as="textarea" placeholder="Tirar algum ingrediente, ..." rows={3} className="col-2 mb-3"/>
                </Form.Group>

                <Form.Group controlId="EmitirNota">
                    <Form.Label>CPF ou CNPJ</Form.Label>
                    <Form.Check type="checkbox" label="Emitir Nota Fiscal"/>
                    <Form.Control type="cpf" placeholder="Digite o CPF/CNPJ" className="col-2 mb-3"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Realizar Pedido
                </Button>
            </Form>
        </>
    )
}

export default RegistrarPedido