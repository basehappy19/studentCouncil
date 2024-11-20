'use client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { User } from '../functions/User';
import { useSession } from 'next-auth/react';
import { UserData } from '../interfaces/User/User';

interface RootProps {
    children: ReactNode;
}
  
const UserContext = createContext<UserData | null>(null);

export const UserProvider = ({children}: RootProps) => {
    const {data: session} = useSession();    
    const [user, setUser] = useState<UserData | null>(null);
    
    const fetchUserData = async (id: number) => {
        try {
            const res = await User({ id: id });
            setUser(res);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(session?.user.id) {
            fetchUserData(session.user.id);
        }
    }, [session]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
