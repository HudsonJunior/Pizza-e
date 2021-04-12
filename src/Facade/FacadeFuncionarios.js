import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const axios = require("axios");

export default class FacadeFuncionarios {

    toastStyle = {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    altFuncionario(body,history){
        axios.patch('http://localhost:8080/funcionarios', {
        ...body
        }).then(result => { toast.success("🍕 Dados atualizados!", {
            ...this.toastStyle,
        })
        
        })
        .catch(error => {
            console.log(error)
            toast.error(error.response.data.message, {
                ...this.toastStyle,
            })
            toast.error(error.response.data.details, {
                ...this.toastStyle,
            })
        })
    }

    getFuncionario = async (cpf,setFuncionario) => {
        try {
           
            const response = await axios.get(
                `http://localhost:8080/funcionarios?cpf=${cpf}`
            );
            const produtosResponse = await response.data;
            setFuncionario(produtosResponse);
            console.log("facade--------------------",produtosResponse)
        } catch (error) {
            setFuncionario([]);
        }
    };
}