import React from 'react'
import FormProduto from './../components/FormProduto'

const GerenciarProduto = props => {
    const tipo = props.location?.state?.tipo
    const item = props.location?.state?.item
    var tipoProduto = null

    if (!item)
        tipoProduto = props.location?.state?.tipoProduto

    return (
        tipo === 'Editar' ?
            <FormProduto
                tipo="Editar"
                item={item}
                tipoProduto={tipoProduto}
            >
            </FormProduto>
            :
            <FormProduto
                tipo="Cadastrar"
                item={item}
                tipoProduto={tipoProduto}
            >
            </FormProduto>
    )
}

export default GerenciarProduto