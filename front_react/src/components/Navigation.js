import { Modal } from 'bootstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ModalCrear } from './CrearModal'

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <i className="material-icons">
                            assignment </i> CarCrud
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Carros</Link>
                            </li>
                            <li className="nav-item">
                                <ModalCrear/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}