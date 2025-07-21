import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({ title: "Account Created", description: "Welcome aboard!" });
            navigate("/dashboard");
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <form onSubmit={handleSignup} className="bg-gray-900 p-8 rounded-xl space-y-4 w-full max-w-md text-white">
                <h2 className="text-2xl font-bold text-center">Create Account</h2>
                <Input
                    placeholder="Email"
                    type="email"
                    required
                    className="bg-gray-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    required
                    className="bg-gray-800 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="w-full">Sign Up</Button>
                <p className="text-sm text-gray-400 text-center">
                    Already have an account?{" "}
                    <a href="/" className="text-green-400 hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
