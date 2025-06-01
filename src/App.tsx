import { Routes, Route } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signUp"
import ProtectedRoute from "./components/auth/protectedRoute"
import PricingPage from "./pages/pricing"
import RenamePage from "./pages/rename"
import HistoryPage from "./pages/history"
import { useState } from "react"
import { Toaster } from "react-hot-toast"

export default function App() {
    const [creditBalance, setCreditBalance] = useState(2000);
    const [downloadReady, setDownloadReady] = useState(false);

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
                                        setDownloadReady={setDownloadReady} /> : 
                                    <PricingPage creditBalance={creditBalance}/>
                                }
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="history" element={<HistoryPage creditBalance={creditBalance}/>} />
                </Route>
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    )
}