import React, { useState } from 'react'
import Table from './Table'

const GenericPage = props => {
    const [busca_id, setBuscaId] = useState("")
    const [dataList, setDataList] = useState(props.data)
    const Buscar = id => {

    }

    return(
        <>
        <div className="containerGeneric">
            <input 
                type="text" 
                className="item-buscado"
                onChange={id => setBuscaId(id)}
            />
        
            <button
                onClick={Buscar(busca_id)}>
                Buscar
            </button>

            <div className="containerData">
                <Table data={dataList}/>
            </div>
        </div> 
        </>
    )
}

export default GenericPage