import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const { user, isAdmin, logout } = UserAuth();
    const navigate = useNavigate();

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
                            <Link to="/" className="mx-2">My Issues</Link>
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