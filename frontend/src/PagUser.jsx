import { useState } from 'react';

function PagUser(props) {
    const [atualizacao, setAtualizacao] = useState("")
    let usuario = props.usuario
    let id = props.id

    function deslog() {
        props.setLc(-1)
    }

    async function deletar(event) {
        let options = {
            method:"DELETE",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Content-type": "application/json"
            }
        }
        let resp = await fetch(`http://localhost:8000/usuarios/${id}`, options)
        console.log(resp)
        if(resp.status == 204) {
            window.alert("usuario deletado")
            props.setLc(-1)
        }
    }

    function atu() {
        console.log("atu")
        setAtualizacao(<Atualizar/>)
    }

    function Atualizar() {
        //so atualiza a senha
        console.log("atualizar")
        const [user, setUser] = useState({
            id:id,
            usuario: usuario,
            senha:""
        })

        function trataAlteracao(event) {
            let novoUser = {...user, [event.target.name]: event.target.value}
            setUser(novoUser)
        }

        async function atualiza(event) {
            event.preventDefault()
            let options = {
                method:"PUT",
                body: JSON.stringify({
                    senha: user.senha
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }
            let resp = await fetch(`http://localhost:8000/usuarios/${user.usuario}`, options)
            console.log(resp)
            if(resp.status == 204) {
                window.alert("senha atualizada")
                setAtualizacao("")
            }
        }

        function voltar() {
            setAtualizacao("")
        }

        return (
            <>
                <div className ="box">
                <form onSubmit={atualiza}>
                    <div className ="field">
                        <label className ="label">Usuário: </label>
                        <div className ="control">
                            <input className ="input" id = "usuario" name = "usuario" value={user.usuario} />
                        </div>
                
                        <label className ="label">Senha: </label>
                        <div className ="control">
                            <input className ="input" id = "senha" name = "senha" value={user.senha} onChange={trataAlteracao}/>
                        </div>

                        <input type="submit" value="Submit" className='button is-success is-outlined'/>
                        <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
                    </div>
                </form>
                </div>
            </>
        )
    }


    return(
        <>
            <div className = "is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center">
            <h1 className='title'>Usuario: {usuario}</h1>
            <div className = "mt-2 is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center">
                <div className = "is-flex  is-align-self-center  is-flex-direction-row is-justify-content-center is-align-content-center is-align-items-center">
                    <button className ="button is-success is-normal mx-1">ver minhas receitas</button>
                    <button className ="button is-primary is-normal mx-1">criar receita</button>
                </div>

                <div className = "mt-2 is-flex  is-align-self-center  is-flex-direction-row is-justify-content-center is-align-content-center is-align-items-center">
                    <button onClick = {atu} className ="button is-normal is-warning mx-1">atualizar usuario</button>
                    <button onClick = {deletar} className ="button is-normal is-danger mx-1">deletar usuario</button>
                </div>

                <button onClick = {deslog} className = "mt-2 button is-info is-normal mx-1">Deslogar</button>
            </div>
            </div>
            {atualizacao}
        </>
    )
}

export default PagUser