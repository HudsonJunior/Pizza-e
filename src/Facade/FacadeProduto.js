import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const axios = require("axios");


export default class FacadeProduto {
    toastStyle = {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };


    baseUrl = 'http://localhost:8080/produtos-finais';

    getProdutos = async (nomeProduto, setProdutos, ativado = false) => {
        try {
            if (nomeProduto != null) {
                const response = await axios.get(
                    `${this.baseUrl}?nome=${nomeProduto}`
                );
                const produtosResponse = await response.data;
                setProdutos(produtosResponse);
            } else {
                const response = await axios.get(
                    `${this.baseUrl}?ativado=${ativado}`
                );
                const produtosResponse = await response.data;
                setProdutos(produtosResponse);
            }
        } catch (error) {
            setProdutos([]);
        }
    };

    postProdutos = async (body, history) => {
        axios.post(this.baseUrl, {
            ...body,
        }).then(result => {
            toast.success("🍕 Produto cadastrado com sucesso!", {
                ...this.toastStyle,
            })
            setTimeout(() => {
                history.push("/produtos")
            }, 3000);
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
                    toast.error('Ocorrou um erro ao cadastrar o produto, tente novamente!', { ...this.data })
                }

            })
    }

    patchProdutos = async (body, messageSuccess, messageError, desativar = false, history) => {
        axios.patch(this.baseUrl, {
            ...body
        }).then(result => {
            toast.success(`${messageSuccess}`, {
                ...this.toastStyle,
            })
            if (desativar) {
                history.go(0)
            }
            else {
                setTimeout(() => {
                    history.push("/produtos")
                }, 3000);
            }
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
                    toast.error(`${messageError}`, {
                        ...this.toastStyle,

                    })
                }

            })
    }
}