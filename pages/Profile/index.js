import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import powerImg from '../../assets/power.svg'
import trashImg from '../../assets/trash-2.svg'

import './style.css'
import api from '../../services/api'

export default function Profile() {
    const ongName = localStorage.getItem("ongName")
    const ongId = localStorage.getItem("ongId")
    const [incidents, setIncidents] = useState([])
    const history = useHistory()
    useEffect(() => {
        api.get("profile", {
            headers: {
                Authorization: ongId
            }
        }).then(
            res => {
                setIncidents(res.data)
            })

    }, [ongId])


    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch (error) {
            alert("Erro ao deletar caso. Tente novamente")
        }
    }


    function handleLogout() {
        localStorage.clear()
        history.push("/")

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" height="64px" />
                <span>Bem vindo(a), {ongName}</span>
                <Link className="button" to="/incident/new"> Cadastrar novo caso</ Link>
                <button type="button" onClick={() => handleLogout()}><img src={powerImg} alt="Power" /></button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}> <img src={trashImg} alt="Delete" height="20px" /> </button>
                    </li>
                ))}

            </ul>
        </div>
    )
}