import React from 'react'

const Home = props =>{
    return(
        <div>
            <h2>Bem vindo, {props.user ? props.user : "Visitante"} 
            </h2>
            <h3>Nossa história</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aenean vel ligula eget massa porttitor lacinia sed non diam.
                     Integer arcu velit, viverra vel porttitor ut, vestibulum eget
                      tortor. Aliquam dictum placerat arcu, id eleifend 
                      velit feugiat at. Ut volutpat maximus tempus. 
                      Phasellus tempor ultrices ultrices. Maecenas id enim at 
                      magna vulputate rhoncus. Maecenas enim purus, aliquet eu 
                      purus ac, efficitur tempus massa.</p>
            <h3>Quem somos</h3>
                <p>Morbi convallis luctus ex vel
                eleifend. Ut eu ipsum varius, blandit lacus ac, accumsan nulla. 
                Vivamus vehicula, nisl fringilla dictum ultrices, ante orci mollis
                mauris, a facilisis metus ex in ante. Cras eget ex at augue 
                gravida commodo. Fusce interdum odio a quam bibendum fermentum.</p>
        </div>
    )
}

export default Home