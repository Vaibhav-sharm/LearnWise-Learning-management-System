"use client"
import React, { useContext, useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../_utils/GlobalApi';
import { UserMemberContext } from '../_context/UserMemberContext';

function Layout({ children }) {
    const { user } = useUser();
    const { isMember, setIsMember } = useContext(UserMemberContext);
    const [isAboveDivVisible, setIsAboveDivVisible] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        user && checkUserMembership();
        // const handleResize = () => {
        //     setIsAboveDivVisible(window.innerWidth >= 768);
        // };
        // handleResize();
        // window.addEventListener('resize', handleResize);
        // return () => window.removeEventListener('resize', handleResize);
    }, [user]);

    const checkUserMembership = () => {
        GlobalApi.checkForMembership(user.primaryEmailAddress.emailAddress).then(resp => {
            console.log(resp);
            if (resp?.memberships?.length > 0) {
                console.log("Its Member");
                setIsMember(true);
            }
        });
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <div className='h-full'>
            <div className={`md:flex h-full ${isNavOpen ? 'w-56' : 'w-full'}`}>
                <div className={`${isNavOpen ? '' : 'hidden md:flex'} h-full w-56 flex-col fixed inset-y-0 z-50`}>
                    <SideNav />
                </div>
                <div className={`md:ml-56 ${isNavOpen ? 'w-full' : ''}`}>
                    <Header toggleNav={toggleNav} isNavOpen={isNavOpen} closeNav={closeNav} />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
