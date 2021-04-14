import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const axios = require("axios");

export default class FacadeRelatorioSatisfacao {


    getFromCpf = async (cpf,setOpniao) => {
        try {
           
            const response = await axios.get(
                `http://localhost:8080/relatorio_satisfacao/pedido?cpf=${cpf}`
            );
            const opnioesResponse = await response.data;
            setOpniao(opnioesResponse);
            console.log("facadedfkjgbsdklgjbsdfkjgsdfkj",opnioesResponse)
        } catch (error) {
            console.log("deu erro")
            setOpniao([]);
        }
    };

    getList = async(setLista) =>{
        try {
           
            const response = await axios.get(
                `http://localhost:8080/relatorio_satisfacao`
            );
            const opnioesResponse = await response.data;
            setLista(opnioesResponse);
            console.log("facadedfkjgbsdklgjbsdfkjgsdfkj",opnioesResponse)
        } catch (error) {
            console.log("deu erro")
            setLista([]);
        }
    }
}
