import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const AuthContext = React.createContext();

const getState = () => {
    const token = localStorage.getItem("token");
    if (token) {
        localStorage.setItem("token", token)
        const UserDataFromToken = jwtDecode(token)
        return UserDataFromToken
    }
}

function AuthProvider(props) {
    // const url = "https://merry-project.vercel.app"
    const url = "http://localhost:4000"
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(getState())
    const navigate = useNavigate();

    // make a login request
    const login = async (data) => {
        console.log(data)
        setLoading(true)
        const response = await axios.post(`${url}/user/login`, data);
        const token = response.data.token
        if (token) {
            localStorage.setItem("token", token)
            setState(getState())
            setLoading(false)
        } else {
            setLoading(false)
            return response.data
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setState(null)
    }

    const isAuthenticated = Boolean(localStorage.getItem("token"));

    return (
        <AuthContext.Provider value={{ loading, login, url, logout, state, isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth }