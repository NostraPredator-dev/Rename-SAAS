export default function PrivacyPolicy() {
    return(
        <div className="max-w-3xl mx-auto p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-6">Last Updated: June 12, 2025</p>

            <section>
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p className="mb-3">
                    Welcome to Rename Wave ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. 
                </p>
                <p className="mb-3">
                    By accessing or using our service, you consent to the practices described in this policy.
                </p>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                <p className="mb-3">We may collect the following types of information:</p>
                <div className="space-y-4">
                    <div className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                        <p><strong>Account Information:</strong> When you create an account, we collect your name, email address, and authentication information from Google when you sign in with Google.</p>
                    </div>
                    <div className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                        <p><strong>Usage Data:</strong> We collect information about how you interact with our service.</p>
                    </div>
                    <div className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                        <p><strong>Payment Information:</strong> If you purchase a subscription, we collect payment information through our payment processor. We do not store complete credit card information on our servers.</p>
                    </div>
                    <div className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                        <p><strong>Technical Information:</strong> We may collect information about your device, browser, IP address, and how you interact with our service.</p>
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
                <p className="mb-3">We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>To provide, maintain, and improve our services</li>
                    <li>To process transactions and manage your account</li>
                    <li>To send you service-related notifications</li>
                    <li>To respond to your comments and questions</li>
                    <li>To protect against fraudulent, unauthorized, or illegal activity</li>
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">4. How We Share Your Information</h2>
                <p className="mb-3">We may share your information with:</p>
                <div className="space-y-4">
                    <div className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                        <p><strong>Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf, such as payment processing, data analysis, and customer service.</p>
                    </div>
                    <div className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                        <p><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</p>
                    </div>
                    <div className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:top-0">
                        <p><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                    </div>
                </div>
                <p className="mb-3 pt-2">We do not sell your personal information to third parties.</p>
            </section>

            <section className="mt-6">
                <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
                <p className="mb-3">We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
            </section>
        </div>
    )
}