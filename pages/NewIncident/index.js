import React, { useState } from 'react';
import './style.css'
import { Link, useHistory } from 'react-router-dom'
import loginImg from '../../assets/arrow-left.svg'
import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function NewIncident() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")
    const ongId = localStorage.getItem("ongId")
    const history = useHistory()

    async function handleNewIncident(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post("incidents", data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push("/profile")
        } catch (error) {
            alert("Erro ao cadastrar caso. Tente Novamente")
        }
    }


    return (

        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <img src={loginImg} height="16" alt="Create Account" />Voltar para home</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input placeholder="Descrição"
                        type="textarea"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor em reais"
                        type="number"
                        min="0.00"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />



                    <button type="submit" className="button" >Cadastrar</button>


                </form>
            </div>
        </div>
    )
}