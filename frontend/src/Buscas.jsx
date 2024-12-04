import { useState } from 'react';
import Receita from './Receita';

function Buscas(props) {
    const [b, setB] = useState({
        nome: "",
        categoria: "Doce",
        ingredientes: 1,
        especificacoes: "lactose"
    })
    const [imp, setImp] = useState("")
    const [estado, setEstado] = useState(0)
    const [ingredientes, setIngredientes] = useState([])

    let op = props.op 
    //1- por nome
    //2- por categoria
    //3- por ingredientes
    //4- por especificacoes
    async function submit(event) {
        event.preventDefault()
        console.log("sub")
        if(op == 1) {
            let res1 = await fetch(`http://localhost:8000/busca/nome/${b.nome}`)
            let dado1 = await res1.json()
            let lis = []
            for(let i = 0; i < dado1.length; i++) {
                lis.push(<Receita setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes} receita = {dado1[i]} key = {dado1[i].id}/>)
            }
            setImp(lis)
        } else if(op == 2) {
            let res2 = await fetch(`http://localhost:8000/busca/categoria/${b.categoria}`)
            let dado2 = await res2.json()
            let lis2 = []
            for(let i = 0; i < dado2.length; i++) {
                lis2.push(<Receita setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes} receita = {dado2[i]} key = {dado2[i].id}/>)
            }
            setImp(lis2)
        }  else if (op == 3) {
            let res3 = await fetch(`http://localhost:8000/busca/ingrediente/${b.ingredientes}`)
            let dado3 = await res3.json()
            let lis3 = []
            for(let i = 0; i < dado3.length; i++) {
                lis3.push(<Receita setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes} receita = {dado3[i]} key = {dado3[i]}/>)
            }
            setImp(lis3)
        } else if (op == 4) {
            let res4 = await fetch(`http://localhost:8000/busca/especificacoes/${b.especificacoes}`)
            let dado4 = await res4.json()
            let lis4 = []
            for(let i = 0; i < dado4.length; i++) {
                lis4.push(<Receita setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes} receita = {dado4[i]} key = {dado4[i]}/>)
            }
            setImp(lis4)
        }
    }

    function voltar() {
        setImp("")
        props.setBusca("")
    }

    function trataAlteracao(event) {
        let novab = {...b, [event.target.name]: event.target.value}
        setB(novab)
    }

    async function buscaDados() {
        const resp = await fetch("http://localhost:8000/ingredientes")
        const dados = await resp.json()
        setIngredientes(dados)
        setEstado(true)
    }

    if(!estado && op == 3) {
        buscaDados()
    }

    return (
        <>
            {
                op == 1 ?
                <div> 
                    <form onSubmit={submit}>
                    <div className ="field">
                        <label className ="label">Nome da receita: </label> <br />
                        <div className ="control">
                            <input className ="input" id = "nome" name = "nome" value={b.nome} onChange={trataAlteracao}/>
                        </div>
                
                        <input type="submit" value="Submit" className='button is-success is-outlined'/>
                        <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
                    </div>
                    </form>
                </div>
                :
                op == 2 ?
                    <div>
                        <form onSubmit={submit}>
                        <div className ="field">
                        <label className ="label mx-1"> Categoria: </label> 
                        <div className="select is-link mx-2">
                            <select name = "categoria" onChange={trataAlteracao}>
                                <option value="Doce">doce</option>
                                <option value="Salgado">salgado</option>
                            </select>
                        </div>
                            <input type="submit" value="Submit" className='button is-success is-outlined'/>
                            <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
                        </div>
                        </form>
                    </div>
                : 
                op == 3 ?
                    <div>
                    <form onSubmit={submit}>
                    <div className ="field">
                    <label className ="label"> Ingrediente: </label>
                    <div className="select is-link">
                        <select name = "ingredientes" onChange={trataAlteracao} value={b.ingredientes}>
                        {
                            ingredientes.map((ingrediente) => {
                                return <option key = {ingrediente.id} value = {ingrediente.id}>{ingrediente.nome}</option> 
                            })
                        }
                        </select>
                    </div>
                        <input type="submit" value="Submit" className='button is-success is-outlined'/>
                        <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
                    </div>
                    </form>
                    </div>
                :
                    <div>
                        <form onSubmit={submit}>
                        <div className ="field">
                        <label className ="label mx-1"> Especificações: </label> 
                        <div className="select is-link mx-2">
                            <select name = "especificacoes" onChange={trataAlteracao}>
                                <option value="lactose">Sem lactose</option>
                                <option value="glutem">Sem glutem</option>
                                <option value="origem_animal">Sem origem animal</option>
                            </select>
                        </div>
                            <input type="submit" value="Submit" className='button is-success is-outlined'/>
                            <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
                        </div>
                        </form>
                    </div>
            }
            
            {imp}  
        </>
    )
}

export default Buscas