import React, { useState } from 'react'
import Table from '../components/Table'
import Menubar from '../components/MenubarComponent'
import GenericPage from '../components/GenericPage';

const Pedidos = () => {
    const user = localStorage.getItem("user");
    const convertedUser = JSON.parse(user);

    const[id_pedido] = useState("")

    const BuscarPedido = (id_pedido) => {}
    
    const data = [
        {id: 1, descrição: "Pizza P calabresa, refrigerante" ,pagamento: "dinheiro", expedição: "retirado no balcao", data: "12-09-2020", CPF: "não cadastrado", observacoes: "nenhuma"},
    ]

    return(
        <>
        <Menubar currentUser={convertedUser} />
        <div className="pedidos">

            <h2>Pedidos:</h2>
            <GenericPage data={data}></GenericPage>
        
        </div>
        </>
    )
}

export default Pedidos