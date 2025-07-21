import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            toast({
                title: "Password Reset Email Sent",
                description: "Check your inbox.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <form onSubmit={handleReset} className="bg-gray-900 p-8 rounded-xl space-y-4 w-full max-w-md text-white">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <Input
                    placeholder="Enter your email"
                    type="email"
                    required
                    className="bg-gray-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" className="w-full">Send Reset Link</Button>
                <p className="text-sm text-gray-400 text-center">
                    <a href="/" className="text-green-400 hover:underline">Back to Login</a>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;
