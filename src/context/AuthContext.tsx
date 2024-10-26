import { auth, db } from '@/config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {createContext, SetStateAction, Dispatch, ReactNode, useState, useContext, useEffect} from 'react';

export type User = Record<string, any> | null;

type Admin = boolean;

export interface UserContextInterface {
    user: User,
    isAdmin: Admin,
    setIsAdmin: Dispatch<SetStateAction<Admin>>,
    setUser: Dispatch<SetStateAction<User>>,
    logout: () => {}
}

const defaultState = {
    user: {},
    setIsAdmin: (admin: Admin) => {},
    setUser: (user: User) => {}
} as UserContextInterface


export const UserContext = createContext(defaultState);

type UserProvideProps = {
    children: ReactNode
}

export const AuthContextProvider = ( {children}: UserProvideProps) => {
    const [user, setUser] = useState<User>({});
    const [isAdmin, setIsAdmin] = useState<Admin>(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    },[])

    const logout = () => {
        return signOut(auth);
    }

    return  (
        <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}

