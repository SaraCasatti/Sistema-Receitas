import { useState } from 'react';

function Receita(props) {
    let receita = props.receita
    return(
        <div className ="container  is-max-tablet card is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center ">
            <header className ="card-header">
                <p className ="card-header-title">{receita.nome}</p>
            </header>
        <div className ="card-content">
        <div className="content">
            <p>Categoria: <b>{receita.categoria}</b></p>
            <p>Tempo: <b>{receita.tempo}</b></p>
            <Ingredientes id = {receita.id}/>
            <p>Modo de preparo: </p>
            <p>{receita.modo_preparo}</p>
        </div>
        </div>
        <footer className="card-footer">
            <button className ="button is-primary is-normal mx-1" >Likes {receita.likes}</button>
            <button className ="button is-danger is-normal">Disliles {receita.dislikes}</button>
        </footer>
        </div>
    )
}

function Ingredientes(props) {
    const [estado, setEstado] = useState(0)
    const [ingredientes, setIngredientes] = useState([])

    async function buscarDados() {
        const resp = await fetch(`http://localhost:8000/receita_ingredientes/${props.id}`)
        const dados = await resp.json()
        setIngredientes(dados)
        setEstado(true)
        console.log(dados)
    }

    if (!estado) {
        buscarDados()
    }

    return(
        <div className='content'> 
            <h3>Ingredientes:</h3>
            <ul>
                {
                    ingredientes.map((ingrediente) => {
                        return <li key = {ingrediente.id_ingrediente}>{ingrediente.ingrediente} ({ingrediente.quantidade} {ingrediente.unidade})</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Receita