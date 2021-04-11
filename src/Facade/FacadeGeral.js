import { toast } from "react-toastify";
const axios = require("axios");

var facadeGeral

export default class FacadeGeral {

    constructor() {
        facadeGeral = this
    }


    login = async (cpf, senha, toastStyle) => {
        return new Promise(function (resolve, reject) {
            try {
                axios.post("http://localhost:8080/login", { cpf: cpf, senha: senha })
                    .then(result => {
                        toast.success('🍕 Login realizado com sucesso', toastStyle)
                        resolve(result);
                    }).catch(error => {
                        if (error.response?.data) {
                            toast.error(error.response.data.message,
                                toastStyle,
                            )
                            toast.error(error.response.data.details,
                                toastStyle,
                            )
                            resolve(null)
                        }
                        else {
                            toast.error('Ocorrou um erro ao realizar o login, tente novamente!', toastStyle)
                        }
                    })

            } catch (error) {
                toast.error('Ocorrou um erro ao realizar o login, tente novamente!', toastStyle)
                reject(error)
            }
        })

    };
}