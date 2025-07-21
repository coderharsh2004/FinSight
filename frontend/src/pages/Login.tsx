import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success("Google login successful!");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Google login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg-login.jpg')" }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />

            {/* Login box */}
            <div
                className="relative z-10 bg-gray-900 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
                <h2 className="text-3xl font-bold text-center mb-2">StockInsight Pro</h2>
                <p className="text-center text-gray-400 mb-6">Login to your account</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-right text-sm">
                        <a href="/forgot-password" className="hover:text-green-400">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-600 font-semibold p-3 rounded transition-all"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-400">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-green-400 hover:underline">Create account</a>
                </p>
                <div className="my-4 flex items-center justify-center text-gray-400 text-sm">
                    <span>or</span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-gray-200 font-semibold p-3 rounded transition-all"
                >
                    Continue with Google
                </button>

                <div className="flex justify-between mt-4 text-sm text-gray-400">
                    <a href="#" className="hover:text-green-400">Forgot password?</a>
                    <a href="#" className="hover:text-green-400">Create account</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
