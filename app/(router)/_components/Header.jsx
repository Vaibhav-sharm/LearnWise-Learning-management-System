import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { BellDot, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Header({ toggleNav, isNavOpen, closeNav }) {
    const { user, isLoaded } = useUser();
    return (
        <div className='p-4 bg-white flex justify-between'>
            {/* Menu Button (for mobile) */}
            <button className={`md:hidden ${isNavOpen ? 'hidden' : ''}`} onClick={toggleNav}>
                <Menu className='h-6 w-6' />
            </button>
            {/* Cross Button (for mobile) */}
            <button className={`md:hidden ${!isNavOpen ? 'hidden' : ''}`} onClick={closeNav} style={{ zIndex: 999 }}>
                <X className='h-6 w-6' />
            </button>

            {/* Search Bar */}
            <div className='flex gap-2 border rounded-md p-2'>
                <Search className='h-5 w-5' />
                <input type='text' placeholder='Search....' className='outline-none' />
            </div>
            {/* Get Started Button */}
            <div className='flex items-center gap-4'>
                <BellDot className='text-gray-500' />
                {isLoaded && user ? <UserButton afterSignOutUrl='/courses' /> :
                    <Link href={'/sign-in'}> <Button>Get Started</Button> </Link>}
            </div>
        </div>
    );
}

export default Header;