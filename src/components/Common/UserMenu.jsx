import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { User, LogOut, ChevronDown } from 'lucide-react';

const UserMenu = ({ session, onOpenAuth }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsOpen(false);
    };

    if (!session) {
        return (
            <button
                onClick={onOpenAuth}
                className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            >
                Sign In
            </button>
        );
    }

    const { user } = session;
    const email = user.email;
    const initial = email ? email[0].toUpperCase() : 'U';

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {initial}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden md:block max-w-[100px] truncate">
                    {email.split('@')[0]}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in slide-in-from-top-2 duration-200 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-medium text-slate-800 truncate">{email}</p>
                    </div>

                    <button
                        onClick={() => { setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                    >
                        <User size={16} />
                        Profile (Coming Soon)
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            )}

            {/* Backdrop to close menu */}
            {isOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
};

export default UserMenu;
