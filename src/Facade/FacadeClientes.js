import { toast } from "react-toastify";
const axios = require("axios");

export default class FacadeClientes {

    getCliente = async (cpf,setCliente) => {
        try {
           
            const response = await axios.get(
                `http://localhost:8080/clientes?cpf=${cpf}`
            );
            const produtosResponse = await response.data;
            setCliente(produtosResponse[0]);
            console.log("facade",produtosResponse[0])
        } catch (error) {
            setCliente([]);
        }
    };

    delCliente(cpf){
      return new Promise(function(resolve, reject){
          try{
              axios.delete(`http://localhost:8080/clientes?cpf=${cpf}`, {});
              resolve();
          }catch(error){
              reject(error);
          }
      })
  }


}