const axios = require("axios");

export default class FacadeFuncionario {
    postFuncionario (
        nome,
        senha,
        cpf,
        rg,
        carteira,
        cep,
        rua,
        numero,
        complemento
    ){
        return new Promise(function(resolve, reject){
            try{
                axios.post('http://localhost:8080/funcionarios', {
                nome,
                senha,
                cpf,
                rg,
                carteira,
                cep,
                rua,
                numero,
                complemento
            });
             resolve();
            }catch(error){
                reject(error);
            }
        })
    }

    patchFunc(
        id,
        nome,
        senha,
        cpf,
        rg,
        carteira,
        cep,
        rua,
        numero,
        complemento){
        return new Promise(function(resolve, reject){
            try{
                axios.patch('http://localhost:8080/funcionarios', {
                    id,
                    nome,
                    senha,
                    cpf,
                    rg,
                    carteira,
                    cep,
                    rua,
                    numero,
                    complemento
                });
                resolve();
            }catch(error){
                reject(error);
            }
        })
    }

    delFuncionario(cpf){
        return new Promise(function(resolve, reject){
            try{
                axios.delete(`http://localhost:8080/funcionarios?cpf=${cpf}`, {});
                resolve();
            }catch(error){
                reject(error);
            }
        })
    }

    getFuncionario = async (cpf, setFunc) => {
        try {
            if (cpf != null) {
                const response = await axios.get(
                    `http://localhost:8080/funcionarios?cpf=${cpf}`
                );
                const funcionarioResponse = await response.data;
                setFunc(funcionarioResponse);
            } else {
                const response = await axios.get(
                    `http://localhost:8080/funcionarios`
                );
                const funcionarioResponse = await response.data;
                setFunc(funcionarioResponse);
            }
        } catch (error) {
            setFunc([]);
        }
    }

    
    getFuncionarioMinhaConta = async (cpf, setFunc) => {
        try {
            if (cpf != null) {
                const response = await axios.get(
                    `http://localhost:8080/funcionarios?cpf=${cpf}`
                );
                const funcionarioResponse = await response.data[0];
                console.log('response', funcionarioResponse);
                setFunc(funcionarioResponse);
            } else {
                const response = await axios.get(
                    `http://localhost:8080/funcionarios`
                );
                const funcionarioResponse = await response.data;
                console.log('else', funcionarioResponse);
                setFunc(funcionarioResponse);
            }
        } catch (error) {
            setFunc([]);
        }
    }
 }