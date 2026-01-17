import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Layout } from 'lucide-react';
import { professions } from '../data/professions';

const LandingPage = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl opacity-50" />
            </div>

            <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">in</span>
                    BannerGen
                </div>
                <button
                    onClick={onStart}
                    className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                    Create Banner
                </button>
            </nav>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center mt-10 md:mt-20 mb-20">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm border border-blue-100">
                        <Sparkles size={16} />
                        <span>AI-Powered LinkedIn Banner Creator</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                        Stand Out Professionally <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            in Seconds
                        </span>
                    </h1>

                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Create stunning, profession-tailored LinkedIn banners with just a few clicks.
                        No design skills required.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStart}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all"
                    >
                        Start Designing
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                </motion.div>

                {/* Feature Grid Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left w-full"
                >
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Layout size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-2">Smart Templates</h3>
                        <p className="text-slate-500 text-sm">Professional layouts designed to work perfectly on all devices.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-2">AI Generated</h3>
                        <p className="text-slate-500 text-sm">Get intelligent tagline suggestions and image curation instantly.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                            <Star size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-2">100% Free</h3>
                        <p className="text-slate-500 text-sm">Export high-quality JPEGs and PDFs without watermarks.</p>
                    </div>
                </motion.div>

            </main>

            <footer className="py-8 text-center text-slate-400 text-sm">
                © {new Date().getFullYear()} BannerGen. Built for Professionals.
            </footer>
        </div>
    );
};

export default LandingPage;
