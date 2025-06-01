import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;