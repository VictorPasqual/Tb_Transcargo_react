import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/APIs';

const UserContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState();
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(false);

    async function authUser(email, password) {
        console.log(email, password)
        try {
            setLoading(true)

            const response = await api.post('/auth', { email, password });
            const userData = response.data.user
            setToken(response.data.token)
            setUser(userData)
            localStorage.setItem('token', response.data.token)


        } catch {
            toast.error('Deu Erro!')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function verificar() {
            const token = localStorage.getItem('token')

            if (token) {
                const response = await api.get('/infoUser', {
                    headers: { Authorization: `${token}` },
                });
                console.log(response.data)
            } else {
                toast.error('Deu Erro!')
            }
        }
        verificar()
    }, []);

    return (

        <UserContext.Provider value={{ user, token, authUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

function useAuth() {
    return (useContext(UserContext))
}

export { UserContext, UserContextProvider, useAuth };
