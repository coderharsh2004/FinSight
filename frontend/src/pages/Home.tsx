import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, ShieldCheck, BarChart3 } from "lucide-react";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
            {/* Hero Section */}
            <section className="text-center py-20 px-6">
                <Badge className="bg-green-500 text-black mb-4">NEW</Badge>
                <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                    Smarter Stock Insights <span className="text-green-400">with AI</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-300 text-lg">
                    Track your investments, get real-time market data, and receive AI-powered alerts—all in one powerful dashboard.
                </p>
                <div className="mt-8 space-x-4">
                    <Button className="bg-green-500 text-black hover:bg-green-600" asChild>
                        <Link to="/signup">Get Started</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-black/20">
                <h2 className="text-3xl font-bold text-center text-green-400 mb-8">Features</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            icon: <TrendingUp className="h-8 w-8 text-green-400" />,
                            title: "Real-Time Price Tracking",
                            desc: "Stay updated with live stock prices using our integrated APIs.",
                        },
                        {
                            icon: <Sparkles className="h-8 w-8 text-green-400" />,
                            title: "AI-Powered Insights",
                            desc: "Let GPT-4 generate smart, actionable insights about your stocks.",
                        },
                        {
                            icon: <ShieldCheck className="h-8 w-8 text-green-400" />,
                            title: "Secure Portfolio",
                            desc: "Track your assets with complete privacy and Firebase authentication.",
                        },
                    ].map((f, i) => (
                        <div key={i} className="p-6 bg-[#1c1c2e] rounded-xl shadow-md space-y-4">
                            {f.icon}
                            <h3 className="text-xl font-semibold">{f.title}</h3>
                            <p className="text-gray-400">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-bold text-center text-green-400 mb-8">What Our Users Say</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {[
                        {
                            name: "Riya Patel",
                            text: "StockInsight Pro transformed the way I invest. The alerts and AI tips are a game-changer!",
                        },
                        {
                            name: "Aman Verma",
                            text: "I love the dark UI and the seamless portfolio tracking features. Clean, responsive, powerful.",
                        },
                    ].map((t, i) => (
                        <div key={i} className="bg-[#1c1c2e] p-6 rounded-xl space-y-2">
                            <p className="text-gray-300 italic">"{t.text}"</p>
                            <h4 className="font-semibold text-green-400">- {t.name}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 text-center bg-gradient-to-tr from-black to-[#1c1c2e]">
                <h2 className="text-3xl font-bold mb-4">Start Your Investment Journey Today</h2>
                <p className="mb-6 text-gray-400">
                    Join thousands of investors using StockInsight Pro to make smarter moves.
                </p>
                <Button className="bg-green-500 text-black hover:bg-green-600" size="lg" asChild>
                    <Link to="/signup">Create Free Account</Link>
                </Button>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-sm text-gray-500 bg-[#131313]">
                © {new Date().getFullYear()} StockInsight Pro. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
