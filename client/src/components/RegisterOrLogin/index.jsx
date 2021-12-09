import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import './style.css'

export const RegisterOrLogin = () => {
    const params = useParams()
    localStorage.setItem('username', params.username)
    if(params.token){
        let token = jwt_decode(params.token);
        console.log(token)
    }

    /* useEffect(() => {
        if(params.username){
            const getToken = async() => {
                try {
                    let response = await fetch('https://127.0.0.1:8000/current');
                    let jsonResponse = await response.json();
                    let token = jwt_decode(jsonResponse.token);
                    console.log(token)
                    console.log(localStorage.getItem('username'))
                    if(token.username === localStorage.getItem('username')){
                        localStorage.setItem('token', jsonResponse.token)
                    }
                } catch(err) {
                    console.log(err)
                }
            }
            getToken();
        }
    },[params.username]) */

    return (
        <div>
            {params.username ? <div>
                <h1 className="usernameDisplay">{params.username}</h1>
                <form action="https://127.0.0.1:8000/logout/">
                    <input className ="LoginOrSignup" type="submit" value=" Logout " />
                </form>
             </div>
            : <form action="https://127.0.0.1:8000/login/">
            <input className ="LoginOrSignup" type="submit" value=" Login / Signup " />
        </form>}
        </div>
    )
}
