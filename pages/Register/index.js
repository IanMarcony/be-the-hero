import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import "./styles.css"
import loginImg from '../../assets/arrow-left.svg'
import logoImg from '../../assets/logo.svg'



import api from '../../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()
        const data = {

            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const res = await api.post("ongs", data)
            alert(`Seu ID de acesso: ${res.data.id}`)
            history.push("/")
        } catch (err) {
            alert("Erro no cadastro, tente novamente")
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os caso da sua ONG.</p>
                    <Link className="back-link" to="/"><img src={loginImg} height="16" alt="Create Account" />Voltar</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="button" >Cadastrar</button>


                </form>
            </div>
        </div>

    )
}