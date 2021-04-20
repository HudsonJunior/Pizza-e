import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const axios = require("axios");

export default class FacadeRelatorioSatisfacao {

    postSatisfacao = async (body, history) => {
        axios.post(this.baseUrl, {
            ...body,
        }).then(result => {
            toast.success("🍕 Opnião postada com sucesso!", {
                ...this.toastStyle,
            })
            setTimeout(() => {
                history.push("/minhaConta")
            }, 2000);
        })
            .catch(error => {
                if (error.response?.data) {
                    toast.error(error.response.data.message, {
                        ...this.toastStyle,
                    })
                    toast.error(error.response.data.details, {
                        ...this.toastStyle,
                    })
                }
                else {
                    toast.error('Ocorrou um erro ao postar sua opnião, tente novamente!', { ...this.data })
                }

            })
    }

    getFromCpf = async (cpf, setOpniao) => {

        try {

            const response = await axios.get(
                `http://localhost:8080/relatorio_satisfacao/pedido?cpf=${cpf}`
            );
            const opnioesResponse = await response.data;
            setOpniao(opnioesResponse);
        } catch (error) {
            setOpniao([]);
        }
    };

    getFromData = async (dataSatisfacao, setOpniao) => {
        try {

            const response = await axios.get(
                `http://localhost:8080/relatorio_satisfacao/data?data=${dataSatisfacao}`
            );
            const opnioesResponse = await response.data;
            setOpniao(opnioesResponse);
        } catch (error) {
            setOpniao([]);
        }
    };

    getList = async (setLista) => {
        try {

            const response = await axios.get(
                `http://localhost:8080/relatorio_satisfacao`
            );
            const opnioesResponse = await response.data;
            setLista(opnioesResponse);
        } catch (error) {
            setLista([]);
        }
    }
}
