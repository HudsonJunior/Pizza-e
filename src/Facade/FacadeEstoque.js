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
            try{
                axios.patch('http://localhost:8080/produtos-estoque', {
                id,
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
 }