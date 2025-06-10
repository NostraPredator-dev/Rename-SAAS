import { Coins, Clock, CheckCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { load } from '@cashfreepayments/cashfree-js'
import {v4 as uuidv4} from 'uuid';
import { toast } from 'react-hot-toast';

interface PricingPageProps {
    creditBalance: number;
    setCreditBalance: (balance: number) => void;
}

export default function PricingPage({ creditBalance, setCreditBalance }: PricingPageProps) {
    const { currentUser } = useAuth();

    let cashfree: any;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox",
        });
    };
    initializeSDK();

    const getSessionId = async (amount: number, credits: number, order_id: string) => {
        try{
            const res = await axios.post('http://localhost:3000/payment', {
                amount: amount,
                credit: credits,
                order_id: order_id,
                customer_id: currentUser?.id,
                customer_name: currentUser?.user_metadata.full_name,
                customer_email: currentUser?.email
            });

            if (res && res.data.payment_session_id)
                return res.data.payment_session_id;
        } catch (error) {
            console.error(error);
        }
    }

    async function updateHistory(credits: number) {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        const response = await axios.post('http://localhost:3000/credit-history', {
            user_id: userId,
            amount: `+` + credits,
            reason: 'Purchased Credits',
            used_at: new Date().toISOString(),
        })
        if (response.status !== 200) {
            const { error } = response.data
            console.error('Error updating history:', error);
        }
    }

    async function updateCreditBalance(credits: number) {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        try{
            const response = await axios.post('http://localhost:3000/credit-balance', {
                user_id: userId,
                credits: creditBalance + credits,
            })
            if (response.status !== 200) {
                const { error } = response.data
                console.error('Error updating credits:', error);
                toast.error('Failed to update credits. Please try again.');
            }
        } catch (error) {
            console.error(error);
        }
        updateHistory(credits);
        setCreditBalance(creditBalance + credits);
    }

    const verifyPayment = async (order_id: string, credits: number) => {
        try{
            const res = await axios.get('http://localhost:3000/verify', { 
                params: { 
                    order_id: order_id
                } 
            });

            if (res && res.data) {
                updateCreditBalance(credits);
                toast.success("Credits added to your account!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const doPayment = async (amount: number, credits: number) => {
        const newOrderId = uuidv4();
        var sessionId = await getSessionId(amount, credits, newOrderId);
        let checkoutOptions = {
            paymentSessionId: sessionId,
            redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then((result: any) => {
            if (result.error) {
                // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                console.log(result.error);
            }
            if (result.redirect) {
                // This will be true when the payment redirection page couldn't be opened in the same window
                // This is an exceptional case only when the page is opened inside an inAppBrowser
                // In this case the customer will be redirected to return url once payment is completed
                console.log("Payment will be redirected");
            }
            if (result.paymentDetails) {
                // This will be called whenever the payment is completed irrespective of transaction status
                console.log("Payment has been completed, Check for Payment Status");
                verifyPayment(newOrderId, credits);
            }
        });
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Buy Credits</h1>
                </header>

                {/* Credit Balance */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="w-full h-20 bg-amber-50 rounded-lg p-6 mb-12 flex justify-between items-center">
                        <div className="flex items-center">
                            <Coins className="text-amber-500 mr-3" size={24} />
                            <div className="ml-3">
                                <p className="text-amber-800 text-sm font-medium">Credit Balance</p>
                                <p className="text-3xl font-bold text-amber-800">{creditBalance}</p>
                            </div>
                        </div>
                        <div>
                            <button className="flex items-center text-amber-800 hover:text-amber-600 transition-colors" onClick={() => window.location.href = '/history'}>
                                <Clock className="mr-2" size={18} />
                                <span className="font-medium">Transaction History</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Tiers */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Starter Plan */}
                        <div className="bg-white rounded-2xl border border-primary-700 shadow-sm hover:shadow-md transition-shadow p-8 max-w-sm flex flex-col justify-between">
                            <div>
                                <div className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">Starter</div>
                                    <h3 className="text-2xl font-bold">1000 Credits</h3>
                                    <p className="text-4xl font-bold text-primary-800 mb-2">₹400</p>
                                    <p className="text-primary-600 text-sm mb-4">Ideal for designer & students</p>
                                <div className="flex bg-primary-50 text-xs font-semibold text-primary-700 px-4 py-2 rounded mb-10">
                                    <Sparkles size={16} className="mr-2" /> Try it out with minimal investment
                                </div>
                                <ul className="text-sm text-primary-700 space-y-2 mb-6">
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Rename unlimited files per batch</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Use any preset or naming rule</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Folder structure support</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Rename preview & undo logs</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Support via email</li>
                                </ul>
                            </div>
                            <a onClick={() => doPayment(400, 1000)} className="mt-auto bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>

                        {/* Most Popular Plan */}
                        <div className="bg-white rounded-2xl border-2 border-accent-500 shadow-lg p-8 max-w-sm flex flex-col justify-between relative">
                            <div className="absolute top-0 right-0 -mt-4 mr-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</div>
                            <div>
                                <div className="inline-block bg-accent-100 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">Most Popular</div>
                                    <h3 className="text-2xl font-bold">5000 Credits</h3>
                                    <p className="text-4xl font-bold text-accent-800 mb-2">₹1200</p>
                                    <p className="text-accent-600 text-sm mb-4">Great for photographers & content creators</p>
                                <div className="flex bg-accent-50 text-xs font-semibold text-accent-700 px-4 py-2 rounded mb-10">
                                    <Sparkles size={16} className="mr-2" /> Best value for most users
                                </div>
                                <ul className="text-sm text-accent-700 space-y-2 mb-6">
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Rename unlimited files per batch</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Use any preset or naming rule</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Folder structure retention</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Rename preview & undo logs</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Support via email</li>
                                </ul>
                            </div>
                            <a onClick={() => doPayment(1200, 5000)} className="mt-auto bg-accent-600 hover:bg-accent-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>

                        {/* High Volume Plan */}
                        <div className="bg-white rounded-2xl border border-tertiary-700 shadow-sm hover:shadow-md transition-shadow p-8 max-w-sm flex flex-col justify-between">
                            <div>
                                <div className="inline-block bg-tertiary-100 text-tertiary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">High Volume</div>
                                    <h3 className="text-2xl font-bold">20,000 Credits</h3>
                                    <p className="text-4xl font-bold text-tertiary-700 mb-2">₹4500</p>
                                    <p className="text-tertiary-600 text-sm mb-4">Perfect for studios, agencies & businesses</p>
                                <div className="flex bg-tertiary-50 text-xs font-semibold text-tertiary-700 px-4 py-2 rounded mb-10">
                                    <Sparkles size={16} className="mr-2" /> For high-volume needs
                                </div>
                                <ul className="text-sm text-tertiary-800 space-y-2 mb-6">
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Rename unlimited files per batch</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Use any preset or naming rule</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Folder structure retention</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Rename preview & undo logs</li>
                                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-success-500" /> Support via email</li>
                                </ul>
                            </div>
                            <a onClick={() => doPayment(4500, 20000)} className="mt-auto bg-tertiary-600 hover:bg-tertiary-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-16 bg-gray-50 rounded-xl p-6 max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">How Credits Work</h2>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                        <li><strong>One credit</strong> = one file rename request.</li>
                        <li>Credits are deducted when you apply a rule or a preset to a file.</li>
                        <li>Credits never expire – use them at your own pace</li>
                        <li>Buy additional credits anytime from your dashboard</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}