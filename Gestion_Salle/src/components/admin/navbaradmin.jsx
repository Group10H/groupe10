import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa";

const Navbaradmin=()=> {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
    <div className="container-fluid">
        <Link to={"/existing-salles"} className="navbar-brand">
            <span className="salle-color">Emsi Rs</span>
        </Link>
           

        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to={"/existing-salles"}>
                    Parcourir toutes les chambres
                    </NavLink>
                </li>
            </ul>

            <ul className="d-flex navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/Salle/add"}>
                        Ajouter une nouvelle Salle
                    </NavLink>
                </li>
            </ul>
            <ul className="d-flex navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/Register"}>
                        Ajouter un nouveau admin
                    </NavLink>
                </li>
            </ul>
            <ul className="d-flex navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/reservations"}>
                        Parcourir les reservations
                    </NavLink>
                </li>
            </ul>
            <ul className="d-flex navbar-nav">
                <li className="nav-item">
                <Link to="/" className="navbar-brand d-none d-lg-block">
            <span className="gap-2">
							<FaSignOutAlt className="ml-5" />  se deconnecter
			</span>
          </Link>
                </li>
            </ul>

        </div>
    </div>
</nav>
  )
}

export default Navbaradmin