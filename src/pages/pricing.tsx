import { Coins, Clock, CheckCircle, Sparkles } from 'lucide-react';

interface PricingPageProps {
    creditBalance: number;
}

export default function PricingPage({ creditBalance }: PricingPageProps) {
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
                                    <p className="text-4xl font-bold text-primary-800 mb-2">$4.99</p>
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
                            <a href="/signup" className="mt-auto bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>

                        {/* Most Popular Plan */}
                        <div className="bg-white rounded-2xl border-2 border-accent-500 shadow-lg p-8 max-w-sm flex flex-col justify-between relative">
                            <div className="absolute top-0 right-0 -mt-4 mr-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</div>
                            <div>
                                <div className="inline-block bg-accent-100 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">Most Popular</div>
                                    <h3 className="text-2xl font-bold">5000 Credits</h3>
                                    <p className="text-4xl font-bold text-accent-800 mb-2">$14.99</p>
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
                            <a href="/signup" className="mt-auto bg-accent-600 hover:bg-accent-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>

                        {/* High Volume Plan */}
                        <div className="bg-white rounded-2xl border border-tertiary-700 shadow-sm hover:shadow-md transition-shadow p-8 max-w-sm flex flex-col justify-between">
                            <div>
                                <div className="inline-block bg-tertiary-100 text-tertiary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">High Volume</div>
                                    <h3 className="text-2xl font-bold">20,000 Credits</h3>
                                    <p className="text-4xl font-bold text-tertiary-700 mb-2">$49.99</p>
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
                            <a href="/signup" className="mt-auto bg-tertiary-600 hover:bg-tertiary-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
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