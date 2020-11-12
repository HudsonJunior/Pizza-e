import React, { Component, useEffect, useState } from 'react'
import EdiText from 'react-editext'

const EditTextUser = () => {
    
    return(
        <div>
            <EdiText>

            </EdiText>
        </div>
    );

}

const EditTextSenha = () => {
    
    return(
        <div>
            <EdiText 
                type= "password"
                value= "Senha"
                onSave= {() => {}}
            >
            </EdiText>
        </div>
    );

}

export default EditTextSenha
