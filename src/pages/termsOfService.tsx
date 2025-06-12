export default function TermsOfService() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-800">
            <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
            <p className="text-sm text-gray-500 mb-6">Effective Date: June 12, 2025</p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Contact Information</h2>
                <p>
                    If you have any questions or concerns regarding these terms, you may contact us at:
                </p>
                <p className="mt-2">
                    <strong>Email:</strong> hcmcdc6038@gmail.com
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Limitation of Liability and Disclaimer of Warranties</h2>
                <p>
                    Our services are provided on an "as is" and "as available" basis without warranties of any
                    kind, either express or implied. We do not guarantee that the service will be uninterrupted,
                    secure, or error-free. In no event shall Rename Wave or its affiliates be liable
                    for any indirect, incidental, special, or consequential damages arising out of or in
                    connection with your use of the service.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Rules of Conduct</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Do not misuse or abuse the service features.</li>
                    <li>Do not attempt to reverse engineer or tamper with the system.</li>
                    <li>Respect intellectual property.</li>
                    <li>Do not use the service for any illegal or unauthorized purpose.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. User Restrictions</h2>
                <p className="mb-2">
                    By using this service, you agree that you will not:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Use automated systems or bots to access or use the service</li>
                    <li>Share or sell access to your account or any generated transcripts</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Changes to These Terms</h2>
                <p>
                    We reserve the right to update or modify these Terms and Conditions at any time. Changes
                    will be posted on this page with a new effective date. Continued use of the service after
                    such changes constitutes your agreement to the updated terms.
                </p>
            </section>
        </div>
    );
};