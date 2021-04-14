const axios = require("axios");

export default class FacadeEstoque {
    postEstoque (
        nome,
        valor,
        peso,
        validade,
        fabricacao
    ){
        return new Promise(function(resolve, reject){
            try{
                axios.post('http://localhost:8080/produtos-estoque', {
                nome,
                valor,
                peso,
                validade,
                fabricacao
                });
                resolve();
            }catch(error){
                reject(error);
            }
        })
    }

    patchEstoque(
        id,
        nome,
        valor,
        peso,
        validade,
        fabricacao){
        return new Promise(function(resolve, reject){   
                axios.patch('http://localhost:8080/produtos-estoque', {
                id,
                nome,
                valor,
                peso,
                validade,
                fabricacao
                }).then(result =>{
                    resolve()

                }).catch(error => {
                    reject(error)
                });
                
        })
    }

    delEstoque(id){
        return new Promise(function(resolve, reject){
            try{
                axios.delete(`http://localhost:8080/produtos-estoque?id=${id}`, {});
                resolve();
            }catch(error){
                reject(error);
            }
        })
    }


    getEstoque = async (id, setEstoque) => {
        try {
            if (id != null) {
                const response = await axios.get(
                    `http://localhost:8080/produtos-estoque?id=${id}`
                );
                const estoqueResponse = await response.data;
                setEstoque(estoqueResponse);
            } else {
                const response = await axios.get(
                    `http://localhost:8080/produtos-estoque`
                );
                const estoqueResponse = await response.data;
                setEstoque(estoqueResponse);
            }
        } catch (error) {
            setEstoque([]);
        }
    }

    getVencidos = async (aVencer, setEstoque) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/produtos-estoque?aVencer=${aVencer}`
            );
            const estoqueResponse = await response.data;
            setEstoque(estoqueResponse);
        } catch (error) {
            setEstoque([]);
        }
    }
 }