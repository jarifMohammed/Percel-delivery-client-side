import { AuthContext } from '@/Providers/AuthProvider';
import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {user,logout} = useContext(AuthContext)

    const handleLogOut = () => {
        logout()
        .then(() => {})
        .catch(error => console.log(error))
    }

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navRef = useRef(null);
    const profileButtonRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav 
        ref={navRef}
        className="fixed rounded-md backdrop-blur mt-5 max-w-screen-2xl mx-auto top-0 left-0 right-0 bg-orange-100 border-b border-gray-200 dark:bg-gray-900 bg-opacity-30 z-50 shadow-sm"
        >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               
            {/* Left side - Logo and main nav */}
            <div className="flex gap-4 items-center">
               <div className='flex gap-4 justify-start '>
               <div className="flex-shrink-0 ">
                <iframe className='w-16 h-16' src="https://lottie.host/embed/8cb93b74-3c4b-44bb-a584-8284c47b78f0/RzKrFvKy4K.lottie"></iframe>
                </div>
               <p className='text-2xl mt-4 font-bold '>Quick Drop</p>
                
               </div>
                <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                    <Link
                    to="/"
                    className="text-orange-500 hover:text-red-300 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Home
                    </Link>
                    <Link
                    to="/about"
                    className="text-orange-500  hover:text-red-300 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    About
                    </Link>
                    
                </div>
                </div>
            </div>

            {/* Right side - User menu and mobile button */}
            <div className="flex items-center">
                {/* Notification icon */}
                <button className="p-2 rounded-full text-orange-500 hover:text-orange-400 dark:text-gray-300 dark:hover:text-white mr-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                </button>

                {/* Profile dropdown */}
                <div className="relative ml-3">
                <button
                    ref={profileButtonRef}
                    onClick={toggleDropdown}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <span className="sr-only">Open user menu</span>
                    <img   rel="noreferrer"
                    className="h-8 w-8 rounded-full"
                    src={user?.photoURL || "https://flowbite.com/docs/images/people/profile-picture-3.jpg"}
                    alt="User profile"
                    />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                    <div
                    ref={dropdownRef}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform duration-200"
                    >
                    <div className="py-1">
                        <div className="px-4 py-2">
                        <p className="text-sm text-gray-900 dark:text-white">{user?.displayName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300 truncate">{user?.email}</p>
                        </div>
                        <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                        Dashboard
                        </Link>
                        
                        {
                            user ? <>
                            <Link
                                onClick={handleLogOut}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Log Out
                            </Link>
                            </> : 
                            <Link
                            to="login"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                            Login
                            </Link>
                        }
                    </div>
                    </div>
                )}
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden ml-2">
                <button
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
                >
                    <svg
                    className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg
                    className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to='/' className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                Home
            </Link>
            <Link to='/about' className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                About
            </Link>
            <Link to='/work' className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                How We Work
            </Link>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;