import React from 'react'
import FormPedido from '../components/FormPedido'

const GerenciarPedido = props => {
    const { tipo } = props.location.state
    const { item } = props.location.state

    return (
        tipo === 'Editar' ?
            <FormPedido
                tipo="Editar"
                item={item}
            >
            </FormPedido>
            :
            <FormPedido
                tipo="Cadastrar"
                item={item}
            >
            </FormPedido>
    )
}

export default GerenciarPedido