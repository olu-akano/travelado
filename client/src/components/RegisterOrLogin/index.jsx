import React from 'react'
import './style.css'

export const RegisterOrLogin = () => {
    return (
        <div>

            <form action="https://localhost:8000/">
                <input className ="LoginOrSignup" type="submit" value=" Login / Signup " />
            </form>

        </div>
    )
}
