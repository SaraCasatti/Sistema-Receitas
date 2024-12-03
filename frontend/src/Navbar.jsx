import logo from './assets/logo.webp';
import user1 from './assets/user1.webp';

function NavBar(props) {
    function usuarios() {
      props.mudaPagina(false)
    }

    function home() {
      props.mudaPagina(true)
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
    
              <a className ="navbar-item">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} id="search">
                  <path fill="#231f20" d="M13.85,13.15l-2.68-2.69a5.14,5.14,0,0,0,1.2-3.28,5.19,5.19,0,1,0-5.19,5.19,5.14,5.14,0,0,0,3.28-1.2l2.69,2.68a.48.48,0,0,0,.7,0A.48.48,0,0,0,13.85,13.15ZM3,7.18a4.19,4.19,0,1,1,4.18,4.19A4.19,4.19,0,0,1,3,7.18Z"></path>
                </svg>
              </a>
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