import React, { useState } from 'react'

export function Login() {
    const [userCredentials, setUserCredentials] = useState({ login: null, senha: null })
    return (
        <div>
            <h1>Login</h1>
            <section>
                <input type='text' onChange={(e) => setUserCredentials(prev => ({ ...prev, login: e.target.value }))} />
                <input type="password" onChange={(e) => setUserCredentials(prev => ({ ...prev, senha: e.target.value }))} />
                <button>Entrar</button>
            </section>
        </div>
    )
}
