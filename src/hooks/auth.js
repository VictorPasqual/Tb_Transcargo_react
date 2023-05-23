import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/APIs';

const UserContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState();
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
            return true;


        } catch {
            toast.error('Deu Erro!')
        } finally {
            setLoading(false);
        }
    }

    async function authUserAdmin(adminLoginEmail, adminLoginPassword) {
        console.log(adminLoginEmail, adminLoginPassword)
        try {
            setLoading(true)
            if (adminLoginEmail && adminLoginPassword) {
                const response = await api.post('/authAdmin', { email: adminLoginEmail, password: adminLoginPassword });
                const userData = response.data
                setIsAdmin(userData.user.role)
                console.log(userData.user.role)
                return true
            } else {
                setIsAdmin(false)
            }



        } catch {
            toast.error('Deu Erro!')
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        localStorage.removeItem('token');
        setUser(null);
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

        <UserContext.Provider value={{ user, isAdmin, token, authUser, authUserAdmin, signOut, loading }}>
            {children}
        </UserContext.Provider>
    );
}

function useAuth() {
    return (useContext(UserContext))
}

export { UserContext, UserContextProvider, useAuth };
