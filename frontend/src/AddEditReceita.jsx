import { useState } from 'react';

function AddEditReceita(props) {
//add - true ou adit - false
    let id_usuario = props.id
    const [subIng, setSubIng] = useState(false) //false - ainda sem ing true - com ingredientes
    const [receita, setReceita] = useState({
        id_usuario: id_usuario,
        nome: "",
        categoria: "doce",
        modo_preparo: "",
        tempo: 0
    })

    const[listaIngRes, setListaIngRes] = useState([]) 
   
    function trataAlteracaoReceita(event) {
        let novaReceita = {...receita, [event.target.name]: event.target.value}
        setReceita(novaReceita)
    }

    async function submit(event) {
        event.preventDefault()
        console.log(receita.modo_preparo)
        let options = {
            method:"POST",
            body: JSON.stringify({
                id: -1,
                id_usuario: id_usuario,
                nome: receita.nome,
                categoria: receita.categoria,
                modo_preparo: receita.modo_preparo,
                tempo: receita.tempo
            }),
            headers: {
                "Content-type": "application/json"
            }
        }
        let resp = await fetch("http://localhost:8000/receitas", options)
        console.log(resp)
        if(resp.status == 201) {
            let r = await resp.json()
            if(subIng) {
                for(let i = 0; i < listaIngRes.length; i++) {
                    console.log(r.insertId)
                    let options1 = {
                        method:"POST",
                        body: JSON.stringify({
                            id_receitas: r.insertId,
                            id_ingredientes: listaIngRes[i].id_ingrediente,
                            quantidade: parseFloat(listaIngRes[i].quantidade).toFixed(2),
                            unidade: listaIngRes[i].unidade
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    }
                    let resp1 = await fetch("http://localhost:8000/receita_ingredientes", options1)
                    if(resp1.status == 200) {
                        window.alert("receita adicionada")
                        props.setAddReceita("")
                        let d = [...props.dados]
                        d.push(receita)
                        props.setDados(d)
                    }
                }
            }
        }
    }

    function voltar(event) {
        event.preventDefault()
        props.setAddReceita("")
    }

    return(
        <>
            <div className ="box is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center">
                <form onSubmit={submit}>
                    <div className ="field is-flex  is-align-self-center  is-flex-direction-row is-justify-content-center is-align-content-center is-align-items-center">
                        <label className ="label mx-1">Nome: </label>
                        <div className ="control mx-2">
                            <input className ="input" id = "nome" name = "nome" value={receita.nome} onChange={trataAlteracaoReceita}/>
                        </div>
                
                        <label className ="label mx-1"> Categoria: </label> 
                        <div className="select is-link mx-2">
                            <select name = "categoria" onChange={trataAlteracaoReceita}>
                                <option value="Doce">doce</option>
                                <option value="Salgado">salgado</option>
                            </select>
                        </div>

                        <label className ="label mx-1">Tempo: </label>
                        <div className ="control mx-2">
                            <input className ="input" type="number" id = "tempo" name = "tempo" value={receita.tempo} onChange={trataAlteracaoReceita}/>
                        </div>
                    </div>
                    <div className ="field ">
                        <AddIngredientes listaIngRes = {listaIngRes} setListaIngRes = {setListaIngRes}  subIng = {subIng} setSubIng = {setSubIng}/>

                        <div className='box'> 
                            <label className ="label">Modo de Preparo: </label> <br />
                            <textarea className="textarea is-medium" name = "modo_preparo" onChange={trataAlteracaoReceita}></textarea>
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

function AddIngredientes(props) {
    const [ingredientes, setIngredientes] = useState([])
    const [estado, setEstado] = useState(0)
    const [maisIngrediente, setMaisIngrediente] = useState(false)
    const[est, setEst] = useState(true)

    async function buscaDadosAdd() {
        const resp = await fetch("http://localhost:8000/ingredientes")
        const dados = await resp.json()
        setIngredientes(dados)
        setEstado(true)
    }

    if(!estado) {
        buscaDadosAdd()
    }

    const [ingredienteReceita, setIngredienteReceita] = useState({
     //dps de criar a receita eu mudo aqui
        id_ingrediente: 1,
        quantidade: 0,
        unidade: "ml"
    })

    

    function trataAlteracao(event) {
        let novoIgredienteReceita = {...ingredienteReceita, [event.target.name]: event.target.value}
        setIngredienteReceita(novoIgredienteReceita)
    }
    
    function add(event) {
        event.preventDefault()
        let lista = [...props.listaIngRes]
        lista.push(ingredienteReceita)
        props.setListaIngRes(lista)
        
        setMaisIngrediente(true)
    }

    function mais(event) {
        event.preventDefault()
        setIngredienteReceita({
             //dps de criar a receita eu mudo aqui
            id_ingrediente: 1,
            quantidade: 0,
            unidade: "ml"
        })
        setMaisIngrediente(false)
    }


    function manda(event) {
        event.preventDefault()
        setEst(false)
        props.setSubIng(true)
    }
    //onSubmit-usa o useState do pai para avisar que tem ingredientes e no pai ele faiz o post do receita_ingredientes apos fazer o post da receita
    
    return(
        <>
            <div className ="box is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center">
           
                <div className ="field">
                    {
                        maisIngrediente == false ?
                       
                        <div >
                            <label className ="label"> Ingrediente: </label>
                            <div className="select is-link">
                                <select name = "id_ingrediente" onChange={trataAlteracao}>
                                {
                                    ingredientes.map((ingrediente) => {
                                        return <option key = {ingrediente.id} value = {ingrediente.id}>{ingrediente.nome}</option> 
                                    })
                                }
                                </select>
                            </div>

                            <label className ="label"> Unidade: </label> 
                            <div className ="select is-link">
                                <select name = "unidade" onChange={trataAlteracao} >
                                    <option value="ml" key = "ml">ml</option>
                                    <option value="g" key = "g">g</option>
                                    <option value="colher de sopa" key = "colher de sopa">colher de sopa</option>
                                    <option value="colher de sobremesa" key = "colher de sobremesa">colher de sobremesa</option>
                                </select>
                            </div>

                            <label className ="label">Quantidade: </label>
                            <div className ="control">
                                <input className ="input" type="number" id = "quantidade" name = "quantidade" value={ingredienteReceita.quantidade} onChange={trataAlteracao}/>
                            </div>
                            
                            <button onClick = {add} className ="button is-success is-outlined is-normal mx-1">Adicionar ingrediente</button>
                        </div>
                        :
                        (
                            est ? (
                                <div className="is-flex is-align-self-center is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center">
                                    <button onClick={mais} className="button is-success is-outlined is-normal mt-1">
                                        + ingrediente
                                    </button>
                                    <div className="my-1">
                                        <button onClick={manda} className="button is-success is-outlined is-normal mx-1">
                                            todos ingredientes escolhidos
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>ingredientes adicionados</p>
                            )
                        )
                    }
                    
                
                </div>
               
            </div>
        </>
    ) 
}

export default AddEditReceita