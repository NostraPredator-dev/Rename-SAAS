import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'
import { AlertTriangle } from 'lucide-react';

export default function SignupPage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            setError('');
            setIsLoading(true);
            await signInWithGoogle();
        } catch (err) {
            setError('Failed to sign up with Google');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-sm">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
                    <p className="mt-3 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign in
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="mt-8">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full h-10 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="h-5 w-5 mr-2"
                        />
                        Sign up with Google
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        We only use Google for authentication. Your Google data is safe and secure.
                    </p>
                </div>
            </div>
        </div>
    );
};
