import { useEffect, useState } from 'react';

function ReceitasUsuario(props) {
    let id_usuario = props.id
    const [receitas, setReceitas] = useState([])
    
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
    
    return(
        <>
        {
            receitas.map((receita) => {
                return(
                    <div className ="container  is-max-tablet card is-flex  is-align-self-center  is-flex-direction-column is-justify-content-center is-align-content-center is-align-items-center ">
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
                            <button className ="button is-primary is-normal mx-1"  >Atualizar</button>
                            <button className ="button is-danger is-normal"  >Deletar</button>
                        </footer>
                    </div>
                )
            })
        }
        </>
    )
    
}

export default ReceitasUsuario