// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/context/AuthContext"
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
//
// // Pages
// import Login from "./pages/Login";
// import Index from "./pages/Index"; // Dashboard page
// import NotFound from "./pages/NotFound";
// import Signup from "./pages/Signup"
// import ForgotPassword from "./pages/ForgotPassword";
// const queryClient = new QueryClient();
//
// const App = () => (
//     <QueryClientProvider client={queryClient}>
//         <TooltipProvider>
//             <Toaster />
//             <Sonner />
//             <AuthProvider> {/* 👈 Wrap everything */}
//                 <BrowserRouter>
//                     <Routes>
//                         <Route path="/" element={<Login />} />
//                         <Route path="/signup" element={<Signup />} />
//                         <Route path="/forgot-password" element={<ForgotPassword />} />
//                         <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
//                         <Route path="*" element={<NotFound />} />
//                     </Routes>
//                 </BrowserRouter>
//             </AuthProvider>
//         </TooltipProvider>
//     </QueryClientProvider>
// );
//
// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pagesx
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Index from "./pages/Index"; // Dashboard
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <ToastContainer position="bottom-right" />
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Index />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
