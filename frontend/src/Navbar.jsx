import logo from './assets/logo.webp';
import user1 from './assets/user1.webp';
import Buscas from './Buscas';

function NavBar(props) {
    function usuarios() {
      props.mudaPagina(false)
    }

    function home() {
      props.mudaPagina(true)
    }

    function nome() {
      props.setBusca(<Buscas op = {1} setBusca = {props.setBusca} setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes}/>)
    }

    function categoria() {
      props.setBusca(<Buscas op = {2} setBusca = {props.setBusca} setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes}/>)
    }

    function ingredientes() {
      props.setBusca(<Buscas op = {3} setBusca = {props.setBusca} setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes}/>)
    }

    function especificacao() {
      props.setBusca(<Buscas op = {4} setBusca = {props.setBusca} setDados = {props.setDados}  atualizaLikesDislikes = {props.atualizaLikesDislikes}/>)
    }

    return (
      <>
      <nav className ="navbar is-light " role="navigation" aria-label="main navigation">
          <div className ="navbar-brand">
            <a  className ="navbar-item mx-0 my-0" href="#">
              <img src= {logo} className='mx-0 my-0' />
            </a>
  
          </div>
  
          <div id="navbarBasicExample" className="navbar-menu">
            <div className ="navbar-start">
              <a className ="navbar-item" onClick={home}>
                Home
              </a>
    
              <div className="navbar-item has-dropdown is-hoverable">
              <a className ="navbar-link">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} id="search">
                  <path fill="#231f20" d="M13.85,13.15l-2.68-2.69a5.14,5.14,0,0,0,1.2-3.28,5.19,5.19,0,1,0-5.19,5.19,5.14,5.14,0,0,0,3.28-1.2l2.69,2.68a.48.48,0,0,0,.7,0A.48.48,0,0,0,13.85,13.15ZM3,7.18a4.19,4.19,0,1,1,4.18,4.19A4.19,4.19,0,0,1,3,7.18Z"></path>
                </svg>
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={nome}>
                  buscar receita por nome
                </a>
                <a className="navbar-item is-selected" onClick={categoria}>
                  buscar receita por categoria
                </a>
                <a className="navbar-item" onClick={ingredientes}>
                  buscar receita por ingredientes
                </a>
                <a className="navbar-item" onClick={especificacao}>
                  buscar receita por especificação
                </a>
              </div>
            </div>
          </div>

           
    
            <div className ="navbar-end">
              <div className ="navbar-item">
                <div className ="buttons">
                  <a  className ="navbar-item mx-0 my-0" href="#" onClick={usuarios}>
                    <img src= {user1} className='mx-0 my-0' />
                  </a>
                </div>
              </div>
            </div>
        </div>
      </nav>
      </>
    )
}

export default NavBar