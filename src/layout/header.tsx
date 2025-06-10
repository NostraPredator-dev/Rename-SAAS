import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/authContext';
import { LogOut, History, ReceiptIndianRupee } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const avatar = currentUser?.user_metadata.avatar_url;
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-15 w-full">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.png" alt='logo' className="h-8 w-8 text-primary-600" />
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex items-center space-x-2 ml-4">
                        <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                            How It Works
                        </a>
                        <a href="#features" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                            Key Features
                        </a>
                        <a href="#use-cases" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                            Use Cases
                        </a>
                        <a href="#pricing" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                            Pricing
                        </a>
                        <a href="#faq" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                            FAQ
                        </a>
                    </nav>

                    <nav className="flex items-center space-x-8 ml-auto">
                        {currentUser ? (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/rename"
                                    className="bg-gradient-to-r from-primary-600 to-accent-600 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <div className="relative" ref={menuRef as React.RefObject<HTMLDivElement>}>
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="w-9 h-9 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center text-sm font-bold focus:outline-none"
                                    >
                                        {avatar ? (
                                            <img
                                                src={avatar}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-primary-700">
                                                {currentUser.user_metadata.full_name?.[0]?.toUpperCase() || "U"}
                                            </span>
                                        )}
                                    </button>

                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-60 bg-white rounded-md border border-gray-300 shadow-lg pt-2">
                                            <div className="px-4 py-2 border-b border-gray-300">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {currentUser.user_metadata.full_name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {currentUser.email}
                                                </p>
                                            </div>
                                            <Link
                                                to="/history"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center h-10 w-full px-4 py-2 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200"
                                            >
                                                <History className="mr-2" size={16}/>
                                                History
                                            </Link>
                                            <Link
                                                to="/pricing"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center h-10 w-full px-4 py-2 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200"
                                            >
                                                <ReceiptIndianRupee className="mr-2" size={16}/>
                                                Pricing
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center h-10 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
                                            >
                                                <LogOut className="mr-2" size={16}/>
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="bg-gradient-to-r from-primary-600 to-accent-600 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;