import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <nav className="flex justify-between w-11/12 mx-auto my-3">
            <Link to="/" className="text-3xl tracking-tighter">Balance</Link>
            <span>
                <Link to="/" className="mx-2">My Issues</Link>
                <Link to="/" className='mx-4'>Check Areas</Link>
                <ModeToggle />
            </span>
        </nav>
    )
}

export default Navbar