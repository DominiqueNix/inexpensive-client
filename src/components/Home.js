import React, {useState} from "react"
import { useNavigate } from "react-router-dom"

import apiURL from "../api"

export const Home = () => {
    const navigate = useNavigate();
    const blankInfo = {
        username: "", 
        password: ""
    }

    const [signup, setsignup] = useState(blankInfo)

    const [login, setlogin] = useState(blankInfo)

    async function handleSignUp(e){
        e.preventDefault();
        const signupPost = await fetch(`${apiURL}/signup`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(signup)
        })
        const data = await signupPost.json();
        setsignup(blankInfo)
        const id = data.id
        // console.log(data)
        navigate(`/user/${id}`)
    }

    async function handleLogin(e){
        e.preventDefault();
        const loginPost = await fetch(`${apiURL}/login`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(login)
        })
        const data = await loginPost.json();
        setlogin(blankInfo)
        // console.log(data)
        const id = data.id
        navigate(`/user/${id}`)
    }


    return(
        <div className="main-page">
            <h1 className="text-center mt-5 display-2">WELCOME TO INEX$PEN$IVE</h1>
            <p className="text-center display-6"><i>becuase nothing's too expensive when when you budget</i></p>

            <section className="w-75 d-flex flex-row align-items-center justify-content-center mx-auto">
            <form className="home-form form text-white p-2 m-2 d-flex flex-column justify-content-center" onSubmit={handleLogin}>
                <p className="display-6 text-center">Login</p>
                <div className="form-group p-2">
                    <label htmlFor="loginUsername">Username</label>
                    <input type="text" className="form-control" id="loginUsername" placeholder="Enter username" 
                    value={login.username}
                    onChange={(e) => setlogin({...login, username: e.target.value})}/>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" className="form-control" id="loginPassword" placeholder="Password" 
                    value={login.password}
                    onChange={(e) => setlogin({...login, password: e.target.value})}/>
                </div>
                <button type="submit" className="btn submitBtn p-2 m-2">Submit</button>
            </form>
            <form className="home-form form text-white p-2 m-2 d-flex flex-column justify-content-center" onSubmit={handleSignUp}>
            <p className="display-6 text-center">Sign up</p>
                <div className="form-group">
                    <label htmlFor="signupUsername p-2">Username</label>
                    <input type="text" className="form-control" id="signupUsername" placeholder="Enter username" 
                    value={signup.username}
                    onChange={(e) => setsignup({...signup, username: e.target.value})}/>
                    <small id="usernameHelp" className="form-text text-secondary">Your username must be unique</small>
                </div>
                <div className="form-group p-2">
                    <label htmlFor="signupPassword">Password</label>
                    <input type="password" className="form-control" id="signupPassword" placeholder="Password" 
                    value={signup.password}
                    onChange={(e) => setsignup({...signup, password: e.target.value})}/>
                </div>
                <button type="submit" className="btn submitBtn p-2 m-2">Submit</button>
            </form>
            </section>
        </div>
    )
} 