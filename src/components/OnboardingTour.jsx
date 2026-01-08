import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';

const TOUR_STEPS = [
    {
        title: "Welcome to AI BannerGen!",
        content: "Let's create a stunning LinkedIn banner in seconds. We've added powerful new AI features to help you stand out.",
        target: "body", // General center
        position: "center"
    },
    {
        title: "AI Profile Analyzer",
        content: "Don't know what to write? Paste your LinkedIn Bio here, and we'll extract your profession, skills, and a perfect tagline automatically.",
        target: "profile-analyzer-trigger", // ID we need to add to that button
        position: "bottom"
    },
    {
        title: "Smart Color Palettes",
        content: "Choose a mood like 'Trust' or 'Creative', and our AI will generate unique, psychology-backed color schemes for your brand.",
        target: "color-palette-gen",
        position: "right"
    },
    {
        title: "Expert Design Critique",
        content: "Not sure about your design? Click here to get instant, actionable feedback from our AI Design Coach.",
        target: "ai-critique-btn",
        position: "left"
    },
    {
        title: "Brand Kit & Badges",
        content: "Upload your logo, save your brand colors, and drag-and-drop achievement badges to showcase your credibility.",
        target: "brand-kit-manager",
        position: "right"
    }
];

const OnboardingTour = ({ onComplete }) => {
    const [stepIndex, setStepIndex] = useState(0);
    // Lazy initialization from localStorage
    const [isVisible, setIsVisible] = useState(() => {
        return !localStorage.getItem('bannergen_tour_seen');
    });

    useEffect(() => {
        // If hidden on mount (because already seen), notify parent
        if (!isVisible && onComplete) {
            onComplete();
        }
    }, [isVisible, onComplete]);

    const handleNext = () => {
        if (stepIndex < TOUR_STEPS.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            finishTour();
        }
    };

    const finishTour = () => {
        localStorage.setItem('bannergen_tour_seen', 'true');
        setIsVisible(false);
        if (onComplete) onComplete();
    };

    if (!isVisible) return null;

    const step = TOUR_STEPS[stepIndex];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" />

            {/* Modal Card (Simple Center for MVP, can be positioned relative to targets later if strict positioning needed) */}
            {/* For this phase, we will do a centered card that explains features rather than complex floating positioning to avoid z-index hell */}

            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-[101] pointer-events-auto animate-in zoom-in-95 duration-200">
                <button
                    onClick={finishTour}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <div className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wide">
                        Step {stepIndex + 1} of {TOUR_STEPS.length}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">
                        {step.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        {step.content}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-8">
                    <div className="flex gap-1">
                        {TOUR_STEPS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === stepIndex ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-200'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-blue-200 shadow-md"
                    >
                        {stepIndex === TOUR_STEPS.length - 1 ? 'Get Started' : 'Next'}
                        {stepIndex === TOUR_STEPS.length - 1 ? <Check size={18} /> : <ChevronRight size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingTour;
