import { useEffect, useState } from 'react';

function ReceitasUsuario(props) {
    let id_usuario = props.id
    const [receitas, setReceitas] = useState([])
    const [atualiza, setAtualiza] = useState(false)
    const [mensagem, setMensgem] = useState("")
    let dados = props.dados
    let setDados = props.setDados
    
    
    useEffect(() => {
        if (id_usuario) {
            async function buscarDados() {
                let res = await fetch(`http://localhost:8000/receitas/${id_usuario}`);
                let dados = await res.json();
                setReceitas(dados);
            }
            buscarDados();
        }
    }, [id_usuario]);

    async function deleta(event) {
        event.preventDefault()
        console.log(event.target.name)
        let id = event.target.name
        let options = {
            method:"DELETE",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Content-type": "application/json"
            }
        }
        let re = await fetch(`http://localhost:8000/receita_ingredientes/${id}`, options)
        if (re.status == 204) {
            let resp = await fetch(`http://localhost:8000/receitas/${id}`, options)
            if(resp.status == 204) {
                let dados = [...props.dados]
                let rec = [...receitas]
                for(let i = 0; i < dados.length; i++) {
                    if(dados[i].id == id) {
                        dados.splice(i,1)
                        props.setDados(dados)
                        break
                    }
                }
                for(let i = 0; i < receitas.length; i++) {
                    if(receitas[i].id == id) {
                        rec.splice(i,1)
                        setReceitas(rec)
                        break
                    }
                }
                window.alert("receita deletado")
            }
        }
    }

    function atu(event) {
        let id = event.target.name
        event.preventDefault()
        let res 
        for(let i = 0; i < receitas.length; i++) {
            if(receitas[i].id == id) {
                res = {...receitas[i]}
                break
            }
        }
        setAtualiza(true)
        setMensgem(<Atualizar receita = {res}/>)
    }

    function Atualizar(props) {
        const [nReceita, setNReceita] = useState({...props.receita})
        
        function trataAlteracaoReceita(event) {
            let novaNReceita = {...nReceita, [event.target.name]: event.target.value}
            setNReceita(novaNReceita)
        }

        async function submit(event) {
            event.preventDefault()
            let options = {
                method:"PUT",
                body: JSON.stringify({
                    modo_preparo: nReceita.modo_preparo,
                    tempo: nReceita.tempo
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }
            let resp = await fetch(`http://localhost:8000/receitas/${nReceita.id}`, options)
            console.log(resp)
            if(resp.status == 204) {
                window.alert("receita atualizada")
                let id = nReceita.id
                let d = [...dados]
                let rec = [...receitas]
                for(let i = 0; i < d.length; i++) {
                    if(d[i].id == id) {
                        d.splice(i,1,nReceita)
                        setDados(dados)
                        break
                    }
                }
                for(let i = 0; i < receitas.length; i++) {
                    if(receitas[i].id == id) {
                        rec.splice(i,1,nReceita)
                        setReceitas(rec)
                        break
                    }
                }
                setAtualiza(false)
                setMensgem("")
            }
        }

        function voltar(event) {
            event.preventDefault()
            setAtualiza(false)
            setMensgem("")
        }

        console.log(nReceita)
        

        return(
            <>
                <div className ="box is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center">
                    <h1 className='title'>Atualização da receita {nReceita.nome}</h1>
                    <form onSubmit={submit}>
                        <div className ="field is-flex  is-align-self-center  is-flex-direction-row is-justify-content-center is-align-content-center is-align-items-center">
                            <label className ="label mx-1"> Categoria: </label> 
                           

                            <label className ="label mx-1">Tempo: </label>
                            <div className ="control mx-2">
                                <input className ="input" type="number" id = "tempo" name = "tempo" value={nReceita.tempo} onChange={trataAlteracaoReceita}/>
                            </div>
                        </div>
                        <div className ="field ">

                            <div className='box'> 
                                <label className ="label">Modo de Preparo: </label> <br />
                                <textarea value = {nReceita.modo_preparo} className="textarea is-medium" name = "modo_preparo" onChange={trataAlteracaoReceita}></textarea>
                            </div>
                        </div>
                        <div className ="field is-flex  is-align-self-center  is-flex-direction-row is-justify-content-center is-align-content-center is-align-items-center">
                            <input type="submit" value="Submit" className='button is-success is-outlined'/>
                            <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    function voltar() {
        props.setVerReceita(false)
    }
    
    return(
        <>
        {   atualiza == false ?
            <div className='is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center'>
            {receitas.map((receita) => {
                return(
                    <>
                    <div  key = {receita.id} className ="container  is-max-tablet card is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center ">
                        <header className ="card-header">
                            <p className ="card-header-title">{receita.nome}</p>
                        </header>
                        <div className ="card-content">
                        <div className="content">
                            <p>Categoria: <b>{receita.categoria}</b></p>
                            <p>Tempo: <b>{receita.tempo}</b></p>
                            <p>Modo de preparo: </p>
                            <p>{receita.modo_preparo}</p>
                        </div>
                        </div>
                        <footer className="card-footer">
                            <button onClick = {atu} name = {receita.id}  className ="button is-primary is-normal mx-1"  >Atualizar</button>
                            <button name = {receita.id} onClick = {deleta} className ="button is-danger is-normal"  >Deletar</button>
                        </footer>
                    </div>
                    </>
                )
            })}
            <button onClick = {voltar} className ="button is-success is-outlined is-normal mx-1">Voltar</button>
            </div>
            :
            mensagem
        }
        </>
    )
    
}

export default ReceitasUsuario