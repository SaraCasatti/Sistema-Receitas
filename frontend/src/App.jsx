import { useState } from 'react';
import NavBar from './Navbar';
import Receita from './Receita';
import User from './User';


function App() {
  const [estado, setEstado] = useState(false)
  const [dados, setDados] = useState([])

  const [usuario, setUsuario] = useState("")
  const [id_usuario, setId_usuario] = useState(-1)
  const [lc, setLc] = useState(-1)//-1 - nenhum form 1-login 2- cadastro 3- deu certo (vai para a pag do usuario)

  const [home, setHome] = useState(true)
  //true = home
  //false = usuario

  const [busca, setBusca] = useState("") //se busca - vai para o componente específico

  async function buscaDados() {
    const res = await fetch("http://localhost:8000/receitas")
    const dado = await res.json()
    setEstado(true)
    setDados(dado)
    return 
  }

  if (!estado) {
    buscaDados()
  }

  function atualizaLikesDislikes() {
    setDados(dados)
  }

  return (
    <>
      <NavBar mudaPagina = {setHome} pagina = {home} setBusca = {setBusca} setDados = {setDados} atualizaLikesDislikes = {atualizaLikesDislikes}/>
      {busca}

      <hr />
      {home ? 
      <div className='content'>
        {
          dados.map((receita) => {
            return <Receita setDados = {setDados} receita = {receita} key = {receita.id} atualizaLikesDislikes = {atualizaLikesDislikes}/>
          })
        }
      </div> :
      <div>
        <User dados = {dados} setDados = {setDados} usuario = {usuario} setUsuario = {setUsuario} id = {id_usuario} setId = {setId_usuario} lc = {lc} setLc = {setLc}/>
      </div>
      }
    </>
  )
}

export default App
