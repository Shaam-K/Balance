import React, { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
const Navbar = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const getUser = await getDoc(doc(db,"users", user.uid));
    
                if (getUser.data()) {
                    if (getUser.data()?.type == "admin") {
                        setIsAdmin(true);
                    }
                }
            }
        }

        checkAdmin();
    },[user])

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <nav className="flex justify-between w-11/12 mx-auto my-3">
            <Link to="/" className="text-3xl tracking-tighter">Balance</Link>
            {user &&
                <span>
                    {isAdmin ?
                        <span>
                            <Link to="/" className="mx-2">My Area</Link>
                            
                            <Button className="mx-4" onClick={handleLogout}>Sign Out</Button>
                            <ModeToggle />
                        </span> :

                        <span>
                            <Link to="/dash" className="mx-2">My Issues</Link>
                            <Link to="/" className='mx-2'>Check Areas</Link>
                            <Button className="mx-4" onClick={handleLogout}>Sign Out</Button>
                            <ModeToggle />
                        </span>
                    }
                </span>
            }
        </nav>
    )
}

export default Navbar