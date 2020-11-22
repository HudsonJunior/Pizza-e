import React from 'react'
import FormPedido from './FormPedido'

const GerenciarPedido = props => {
    console.log(props.location.state)
    const {tipo} = props.location.state
    const {item} = props.location.state

    return(
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