import { Link } from 'react-router-dom';
import { ContactRound, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center">
                            <img src="/logo.png" alt="Logo" className="h-12 w-12 text-primary-600" />
                            <span className="ml-2 text-xl font-medium text-white">RenameWave</span>
                        </Link>
                        <p className="mt-4 text-sm">
                            Effortlessly rename multiple files in seconds with our powerful, intuitive tools.
                        </p>
                        <div className="flex mt-6 space-x-4">
                            <a href="https://portfolio-website-3z9o.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition">
                                <ContactRound className="h-5 w-5" />
                            </a>
                            <a href="https://github.com/NostraPredator-dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/nostra-hardik/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#pricing" className="text-gray-400 hover:text-primary-500">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#features" className="text-gray-400 hover:text-primary-500">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#use-cases" className="text-gray-400 hover:text-primary-500">
                                    Use Cases
                                </a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="text-gray-400 hover:text-primary-500">
                                    How It Works
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-500">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-500">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="text-gray-400 hover:text-primary-500">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-500">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="text-gray-400 hover:text-primary-500">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-12 border-t border-gray-800 py-5">
                    <p className="text-sm text-gray-400 text-center">
                        &copy; {year} RenameWave. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;