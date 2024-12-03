import { useState } from 'react';
import PagUser from './PagUser';

function User(props) {
    let mensagem 

    let usuario = props.usuario 
    let setUsuario = props.setUsuario
    let id = props.id
    let setId = props.setId
    let lc = props.lc
    let setLc = props.setLc


    if(lc == 1) {
        mensagem = (<LoginCadastro op = {lc} setLc = {setLc} setUsuario = {setUsuario} setId = {setId}/>)
    } else if(lc == 2) {
        mensagem = (<LoginCadastro op = {lc} setLc = {setLc} setUsuario = {setUsuario} setId = {setId}/>)
    } else if (lc == -1) {
        mensagem = (
            <div className = "is-flex  is-align-self-center  is-flex-direction-row is-justify-content-center is-align-content-center is-align-items-center" >
                <button className ="button is-primary is-normal mx-1" onClick = {log}>Login</button>
                <button className ="button is-primary is-normal mx-1" onClick = {cad}>Cadastro</button>
            </div>
        )
    } else if(lc == 3) {
        mensagem = (<PagUser usuario = {usuario} id = {id} setUsuario = {setUsuario} setId = {setId} setLc = {setLc}/>)
    }
    

    function log() {
        setLc(1)
    }

    function cad() {
        setLc(2)
    }
    
    return(
        <>
            {mensagem}
        </>
    )
}

function LoginCadastro(props) {
    let mensagem
    const [usuario, setUsuario] = useState({
        usuario: "",
        senha: ""
    })

    if(props.op == 1) {
        mensagem = (<h1>Login:</h1>)
    } else if (props.op == 2) {
        mensagem = (<h1>Cadastro:</h1>)
    }

    function submit(event) {
        event.preventDefault()
        if(props.op == 1) {
            return login()
        } else if (props.op == 2) {
            return cadastro()
        }
    }
   
    async function login(event) {
        
        let resp = await fetch(`http://localhost:8000/usuarios/${usuario.usuario}`)
        if(resp.status == 404) {
            window.alert("Usuário inexistente, faça o cadastro")
            props.setLc(-1)
        } else {
            let usu = await resp.json()
            let resp2 = await fetch(`http://localhost:8000/usuarios/${usuario.usuario}/${usuario.senha}`)
            if(resp2.status == 200) {
                console.log("logado")
                props.setUsuario(usu.usuario)
                props.setId(usu.id)
                props.setLc(3)
            } 
        }
    }

    async function cadastro(event) {
        console.log("cad")
        let teste = await fetch(`http://localhost:8000/usuarios/${usuario.usuario}`)
        if(teste.status == 404) {
            let options = {
                method:"POST",
                body: JSON.stringify({
                    id: -1,
                    usuario: usuario.usuario,
                    senha: usuario.senha
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }
            let resp = await fetch("http://localhost:8000/usuarios", options)
            console.log(resp)
            if(resp.status == 201) {
                props.setUsuario(usuario.usuario)
                let resp2 = await fetch(`http://localhost:8000/usuarios/${usuario.usuario}`)
                let dados = await resp2.json()
                props.setId(dados.id)
                props.setLc(3)
            }
        } else {
            window.alert("usuario ja existe")

        }
    }

    function trataAlteracao(event) {
        let novoUsuario = {...usuario, [event.target.name]: event.target.value}
        setUsuario(novoUsuario)
    }

    function voltar() {
        props.setLc(-1)
    }

    return(
        <>
            <div className ="box">
                <form onSubmit={submit}>
                    <div className ="field">
                        <label className ="label">Usuário: </label>
                        <div className ="control">
                            <input className ="input" id = "usuario" name = "usuario" value={usuario.usuario} onChange={trataAlteracao}/>
                        </div>
                
                        <label className ="label">Senha: </label>
                        <div className ="control">
                            <input className ="input" id = "senha" name = "senha" value={usuario.senha} onChange={trataAlteracao}/>
                        </div>

                        <input type="submit" value="Submit" className='button is-success is-outlined'/>
                        <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
                    </div>
                </form>
                
            </div>
        </>
    )
}



export default User
