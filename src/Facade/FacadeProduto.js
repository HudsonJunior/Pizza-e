const axios = require("axios");

export default class FacadeProduto {
    baseUrl = 'http://localhost:8080/produtos-finais';

    getProdutos = async (nomeProduto, setProdutos) => {
        try {
            if (nomeProduto != null) {
                const response = await axios.get(
                    `${this.baseUrl}?nome=${nomeProduto}`
                );
                const produtosResponse = await response.data;
                setProdutos(produtosResponse);
            } else {
                const response = await axios.get(
                    this.baseUrl
                );
                const produtosResponse = await response.data;
                setProdutos(produtosResponse);
            }
        } catch (error) {
            setProdutos([]);
        }
    };

    postProdutos = async (body) => {
        axios.post(this.baseUrl, {
            ...body,
        }).then(result => {
            toast.success("🍕 Produto cadastrado com sucesso!", {
                toastStyle,
            })
            setTimeout(() => {
                history.push("/produtos")
            }, 3000);
        })
            .catch(error => {
                if (error.response?.data) {
                    toast.error(error.response.data.message, {
                        toastStyle,
                    })
                    toast.error(error.response.data.details, {
                        toastStyle,
                    })
                }
                else {
                    toast.error('Ocorrou um erro ao cadastrar o produto, tente novamente!', { toastStyle, })
                }

            })
    }

    patchProdutos = async (body, messageSuccess, messageError, desativar = false) => {
        axios.patch(this.baseUrl, {
            ...body
        }).then(result => {
            toast.success(`${messageSuccess}`, {
                toastStyle,
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
                        toastStyle,
                    })
                    toast.error(error.response.data.details, {
                        toastStyle,
                    })
                }
                else {
                    toast.error(`${messageError}`, { toastStyle, })
                }

            })
    }
}