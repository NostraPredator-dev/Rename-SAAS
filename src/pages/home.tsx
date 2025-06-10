import { useState } from 'react';
import { 
    ArrowRight,
    FileText,
    Clock, 
    RotateCcw, 
    UploadCloud as CloudUpload, 
    HardDrive, 
    Code, 
    RefreshCw, 
    Zap, 
    ChevronDown, 
    ChevronUp, 
    CheckCircle, 
    Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "Is there a limit to how many files I can rename?",
        answer: "The Free plan supports up to 50 files per batch. Higher limits are available with premium plans.",
    },
    {
        question: "What are \"credits\"?",
        answer: "Credits are the currency used in RenameWave to perform file renaming tasks. You can purchase credits to use the service more extensively. When renaming files, each file consumes one credit.",
    },
    {
        question: "Can I save my custom renaming rules?",
        answer: "Absolutely! You can save your favorite renaming patterns as presets to use them again later.",
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. RenameWave processes your files directly in your browser. Your files are never uploaded to our servers unless you're using the cloud integration feature. We have a strict privacy policy and do not collect any personal data from your files.",
    },
    {
        question: "Can I rename files stored in the cloud?",
        answer: "Yes, with our Pro plan, you can connect cloud storage services and rename files directly within them.",
    },
    {
        question: "How does cloud integration work?",
        answer: "Connect your Google Drive, Dropbox, or OneDrive account. This enables you to select files directly from your cloud storage, rename them, and save them back without downloading and re-uploading. (Coming Soon)",
    },
    {
        question: "What file types can I rename?",
        answer: "RenameWave works with all file types. You can rename documents, images, videos, audio files, archives, and any other file format you might have.",
    }
]

export default function HomePage() {
    const [openIndex, setOpenIndex] = useState(-1);
    
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    }

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
                    <img src="/logo.png" alt="Logo" className="h-70 w-70 animate-bounceLight mb-4" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-8 mb-6">
                        Rename Multiple Files <br /> With Just a Few Clicks
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl opacity-90">
                        The smart way to rename files in bulk. Save time and organize your digital assets effortlessly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#how-it-works"
                            className="border border-white text-white hover:bg-white hover:text-primary-700 rounded-lg px-8 py-4 text-lg font-medium transition-colors"
                        >
                            See How It Works
                        </a>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Rename your files in just three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-primary-100 p-5 rounded-full mb-6">
                                <CloudUpload className="h-10 w-10 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Upload Files</h3>
                            <p className="text-gray-600">
                                Drag & drop files or select them from your computer. Upload as many files as you need at once.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-primary-100 p-5 rounded-full mb-6">
                                <Code className="h-10 w-10 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Apply Rules</h3>
                            <p className="text-gray-600">
                                Choose from various renaming options: add prefixes, suffixes, replace text, add numbering, and more.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="bg-primary-100 p-5 rounded-full mb-6">
                                <HardDrive className="h-10 w-10 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Download Files</h3>
                            <p className="text-gray-600">
                                Preview the changes and download your renamed files. You can also save your renaming rules for future use.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Powerful tools designed to make file renaming fast and efficient
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <FileText className="h-10 w-10 text-primary-600 mb-4 animate-bounceLight" />
                            <h3 className="text-xl font-semibold mb-3">Batch Renaming</h3>
                            <p className="text-gray-600">
                                Rename hundreds of files simultaneously with just a few clicks, saving you time and effort.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <RefreshCw className="h-10 w-10 text-primary-600 mb-4 animate-bounceLight" />
                            <h3 className="text-xl font-semibold mb-3">Smart Rules</h3>
                            <p className="text-gray-600">
                                Create complex renaming patterns with our intuitive rule builder. Combine multiple rules for precision.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Clock className="h-10 w-10 text-primary-600 mb-4 animate-bounceLight" />
                            <h3 className="text-xl font-semibold mb-3">Real-time Preview</h3>
                            <p className="text-gray-600">
                                See how your files will look after renaming before committing to the changes.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <RotateCcw className="h-10 w-10 text-primary-600 mb-4 animate-bounceLight" />
                            <h3 className="text-xl font-semibold mb-3">Rule Presets</h3>
                            <p className="text-gray-600">
                                Save your favorite renaming patterns as presets to reuse them whenever you need.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Zap className="h-10 w-10 text-primary-600 mb-4 animate-bounceLight" />
                            <h3 className="text-xl font-semibold mb-3">Advanced Options</h3>
                            <p className="text-gray-600">
                                Use advanced features like case conversion, sequential numbering, and date formatting.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <CloudUpload className="h-10 w-10 text-primary-600 mb-4 animate-bounceLight" />
                            <h3 className="text-xl font-semibold mb-3">Cloud Support</h3>
                            <p className="text-gray-600">
                                Connect to cloud storage services and rename files directly in your cloud folders (Coming Soon).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section id="use-cases" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Use Cases</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            RenameWave helps professionals across various fields organize their digital assets
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Use Case Cards */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold mb-4">For Photographers</h3>
                            <p className="text-gray-600 mb-6">
                                Rename hundreds of photos from a photoshoot with custom naming conventions that include date, client name, and sequential numbering.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Organize photos by date, location, or event</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Add client information to filenames</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Create consistent naming patterns across projects</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold mb-4">For Businesses</h3>
                            <p className="text-gray-600 mb-6">
                                Standardize file naming across your organization to improve document management and compliance.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Create consistent naming for contracts and invoices</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Batch update document version numbers</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Standardize file naming across departments</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold mb-4">For Designers</h3>
                            <p className="text-gray-600 mb-6">
                                Keep design assets organized with clear, descriptive filenames that include version info and asset type.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Add version numbers to design iterations</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Tag files with project and client information</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Organize assets by type and purpose</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-semibold mb-4">For Music Producers</h3>
                            <p className="text-gray-600 mb-6">
                                Organize your audio files, samples, and project files with consistent naming that includes BPM, key, and more.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Add track information to audio files</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Organize samples by instrument and type</span>
                                </li>
                                <li className="flex items-start">
                                    <ArrowRight className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Include BPM and key information in filenames</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Credit-Based Pricing</h2>
                        <p className="text-xl ">One-time purchase. No subscriptions. No auto-renewals.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Starter Plan */}
                        <div className="bg-white rounded-2xl border border-primary-700 shadow-sm hover:shadow-md transition-shadow p-8 w-full max-w-sm flex flex-col justify-between">
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
                            <a href="/signup" className="mt-auto bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>

                        {/* Most Popular Plan */}
                        <div className="bg-white rounded-2xl border-2 border-accent-500 shadow-lg p-8 w-full max-w-sm flex flex-col justify-between relative">
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
                            <a href="/signup" className="mt-auto bg-accent-600 hover:bg-accent-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>

                        {/* High Volume Plan */}
                        <div className="bg-white rounded-2xl border border-tertiary-700 shadow-sm hover:shadow-md transition-shadow p-8 w-full max-w-sm flex flex-col justify-between">
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
                            <a href="/signup" className="mt-auto bg-tertiary-600 hover:bg-tertiary-700 text-white text-center py-3 rounded-lg font-medium transition-colors">
                                Purchase Credits
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600">
                            Got questions? We've got answers.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center text-left"
                                >
                                    <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                                    {openIndex === index ? (
                                        <ChevronUp className="h-5 w-5 text-primary-600 animate-bounceLight" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-primary-600" />
                                    )}
                                </button>
                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.p
                                            key="answer"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="mt-4 overflow-hidden text-gray-600"
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};