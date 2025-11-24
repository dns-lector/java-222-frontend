import { Link, Outlet } from "react-router-dom";
import './Layout.css';
import { useContext } from "react";
import AppContext from "../../features/appContext/AppContext";
import AuthModal from "./AuthModal";

export default function Layout() {
    const {cart, user, setToken} = useContext(AppContext);
    
    return <>
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Frontend-222</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex justify-content-between w-100" >
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/privacy">Privacy</Link>
                                </li>
                                {!!user && <li className="nav-item">
                                    <Link className="nav-link active" to="/admin">Admin</Link>
                                </li>}
                            </ul>
                            <form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            <div className="nav-auth-block">
                                {!user 
                                ? <>
                                    <button className="btn btn-outline-secondary" 
                                            data-bs-toggle="modal" data-bs-target="#authModal">
                                        <i className="bi bi-box-arrow-in-right"></i>
                                    </button>
                                  </>
                                : <>
                                    <Link to="/profile" title={user.name} className="link-to-profile v-center">
                                        {user.name[0].toUpperCase()}
                                    </Link>

                                    <Link to="/cart" className="btn btn-outline-success me-3 cart-btn-layout">
                                        <i className="bi bi-cart"></i>
                                        <span>{cart.cartItems.length}</span>
                                    </Link>
                                    
                                    <button className="btn btn-outline-secondary" 
                                            onClick={() => setToken(null)}>
                                        <i className="bi bi-box-arrow-right"></i>
                                    </button>
                                  </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <main>
            <div className="container">
                <Outlet />
            </div>            
        </main>

        <footer className="bg-body-tertiary border-top py-3">
            <div className="container">
                &copy; 2025, IT STEP University
            </div>
        </footer>

        <AuthModal />        
    </>;
}


/*
Д.З. Реалізувати підказку, що спливає (title), при наведені курсора на кнопку
віджета кошика. 
- якщо кошик порожній, то так і виводити "У кошику немає товарів", 
- якщо ні, то формувати міні-звіт: 
У вашому кошику
позицій - 3
товарів - 7
на загальну суму 1400
(натисніть для оформлення)
*/