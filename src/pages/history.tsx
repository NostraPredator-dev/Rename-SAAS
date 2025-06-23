import { Coins, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/authContext";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

interface HistoryPageProps {
    creditBalance: number;
}

interface CreditHistory {
    id: string;
    user_id: string;
    amount: number;
    used_at: string;
}

export default function HistoryPage({ creditBalance }: HistoryPageProps) {
    const [creditHistory, setCreditHistory] = useState<CreditHistory[]>([]);
    const { currentUser } = useAuth();

    async function fetchCreditHistory() {
        const userId = currentUser?.id;
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        const response = await axios.get('/api/credit-history', {
            params: {
                user_id: userId
            }
        });
        if (response.status !== 200) {
            const { error } = response.data;
            console.error('Error fetching credit history:', error);
            toast.error('Failed to fetch credit history');
            return;
        } else {
            return response.data;
        }
    }

    useEffect(() => {
        async function loadCreditHistory() {
            const history = await fetchCreditHistory();
            if (history) {
                setCreditHistory(history);
            }
        }
        loadCreditHistory();
    }, [currentUser]);

    return (
        <div className="min-h-screen bg-white mt-8">
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
                </div>
            </div>

            {/* Transaction History */}
            <div className="max-w-3xl mx-auto px-4 mt-10">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Transaction History</h2>

                <div className="space-y-4">
                    {creditHistory.length > 0 ? (
                        <ul className="space-y-4">
                            {creditHistory.map((transaction: any) => {
                                const isDebit = transaction.amount < 0;
                                const amountColor = isDebit ? 'text-red-500' : 'text-green-600';
                                const Icon = isDebit ? ArrowDownLeft : ArrowUpRight;
                                return (
                                    <li key={transaction.id} className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-full bg-${isDebit ? 'red' : 'green'}-100`}>
                                                <Icon className={`h-5 w-5 ${amountColor}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-700 font-medium">{transaction.reason}</p>
                                                <p className="text-xs text-gray-500">{new Date(transaction.used_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <span className={`text-md font-semibold ${amountColor}`}>
                                            {isDebit ? '-' : '+'}{Math.abs(transaction.amount)}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-8 text-sm">No transactions found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
