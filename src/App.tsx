import { Routes, Route } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signUp"
import ProtectedRoute from "./components/auth/protectedRoute"
import PricingPage from "./pages/pricing"
import RenamePage from "./pages/rename"
import HistoryPage from "./pages/history"
import PrivacyPolicy from "./pages/privacyPolicy"
import TermsOfService from "./pages/termsOfService"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { useAuth } from "./context/authContext"
import axios from "axios"

export default function App() {
    const [creditBalance, setCreditBalance] = useState(0);
    const [downloadReady, setDownloadReady] = useState(false);

    const { currentUser } = useAuth();

    useEffect(() => {
        async function getBalance(id: string) {
            const res = await axios.get('https://rename-saas.onrender.com/credit-balance', { 
                params: {
                    user_id: id 
                } 
            });

            if (!res || res.data.length === 0) {
                const response = await axios.post('https://rename-saas.onrender.com/create-credit-balance', {
                    user_id: id,
                })
                if (response.status !== 200) {
                    const { error } = response.data
                    console.error('Error updating credits:', error);
                } else {
                    setCreditBalance(0);
                }
            } else 
                setCreditBalance(res.data[0].credit_balance || 0);
        }

        const userId = currentUser?.id;
        if (userId) {
            getBalance(userId);
        }
    }, [currentUser]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route 
                        path="rename" 
                        element={
                            <ProtectedRoute>
                                {creditBalance > 0 || downloadReady? 
                                    <RenamePage 
                                        creditBalance={creditBalance} 
                                        setCreditBalance={setCreditBalance}
                                        downloadReady={downloadReady}
                                        setDownloadReady={setDownloadReady} 
                                    /> : 
                                    <PricingPage 
                                        creditBalance={creditBalance}
                                        setCreditBalance={setCreditBalance}
                                    />
                                }
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="pricing" element={<PricingPage creditBalance={creditBalance} setCreditBalance={setCreditBalance} />} />
                    <Route path="history" element={<HistoryPage creditBalance={creditBalance}/>} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms-of-service" element={<TermsOfService />} />
                </Route>
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    )
}