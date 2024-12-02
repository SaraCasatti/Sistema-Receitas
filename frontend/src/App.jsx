import { useState } from 'react';
import NavBar from './Navbar';
import Receita from './Receita';


function App() {
  const [estado, setEstado] = useState(0)
  const [dados, setDados] = useState([])

  async function buscaDados() {
    const res = await fetch("http://localhost:8000/receitas")
    const dado = await res.json()
    console.log(dado)
    setEstado(true)
    setDados(dado)
    return 
  }

  if (!estado) {
    buscaDados()
  }

  return (
    <>
      <NavBar/>
      <div className='content'>
        {
          dados.map((receita) => {
            return <Receita receita = {receita} key = {receita.id}/>
          })
        }
      </div>
      
    </>
  )
}

export default App
