import { useEffect, useState } from 'react';

function Receita(props) {
    let receita = props.receita
    
    async function likes() {
       props.atualizaLikesDislikes()
        
        let options = {
            method: "PUT",
            body: JSON.stringify({
                id: receita.id,
                likes: receita.likes +1
            }),
            headers: {
                "Content-type": "application/json"
            }
        }
        const resp = await fetch(`http://localhost:8000/receitas/likes/${receita.id}`, options)
        
    }

    async function dislikes() {
        props.atualizaLikesDislikes()
        let options = {
            method:"PUT",
            body: JSON.stringify({
                id: receita.id,
                dislikes: receita.dislikes +1 
            }),
            headers: {
                "Content-type": "application/json"
            }
        }
        const resp = await fetch(`http://localhost:8000/receitas/dislikes/${receita.id}`, options)
    }

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
            <button className ="button is-primary is-normal mx-1" onClick={likes} >Likes {receita.likes}</button>
            <button className ="button is-danger is-normal" onClick={dislikes} >Dislikes {receita.dislikes}</button>
        </footer>
        </div>
    )
}

function Ingredientes(props) {

    const [ingredientes, setIngredientes] = useState([])

    useEffect(() => {
        async function buscarDados() {
            const resp = await fetch(`http://localhost:8000/receita_ingredientes/${props.id}`);
            const dados = await resp.json();
            setIngredientes(dados);
        }
        buscarDados();
    }, [props.id]);

    return(
        <div className='content'> 
            <b>Ingredientes:</b>
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