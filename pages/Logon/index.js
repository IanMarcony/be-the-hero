import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
import api from "../../services/api"
import loginImg from '../../assets/log-in.svg'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const [id, setId] = useState("")
    const history = useHistory()
    async function handleLogin(e) {
        e.preventDefault()

        try {
            const res = await api.post("sessions", { id })

            localStorage.setItem("ongId", id)
            localStorage.setItem("ongName", res.data.name)

            history.push("/profile")
        } catch (error) {
            alert("Falha ao fazer o login. Tente novamente.")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register"><img src={loginImg} height="16" alt="Create Account" />Não tenho cadastro</Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />

        </div>


    )

}