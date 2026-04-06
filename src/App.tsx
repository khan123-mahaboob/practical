/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  LogOut,
  History,
  ExternalLink,
  Loader2,
  AlertCircle,
  FileText,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---

type View = 'login' | 'signup' | 'dashboard';

interface AnalysisResult {
  isFake: boolean;
  confidence: number;
  reasoning: string;
  sources?: string[];
  keyClaims: { claim: string; status: 'verified' | 'refuted' | 'unverified' }[];
  summary: string;
}

// --- Components ---

const Navbar = ({ user, onLogout }: { user: string | null, onLogout: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 glass-panel z-50 flex items-center justify-between px-6">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
        <Shield size={24} />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">VeriTrust</span>
    </div>
    
    {user && (
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-medium text-slate-900">{user}</span>
          <span className="text-xs text-slate-500">Pro Member</span>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    )}
  </nav>
);

const LoginPage = ({ onLogin, onSwitchToSignup }: { onLogin: (user: string) => void, onSwitchToSignup: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      onLogin(email.split('@')[0] || 'User');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin('Google User');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 rounded-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Verify what matters with VeriTrust</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email / Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                required
                className="input-field pl-10" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                className="input-field pl-10" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Sign In</>}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="btn-secondary w-full flex items-center justify-center gap-2 mb-6"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
          Sign in with Google
        </button>

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="text-brand-600 font-semibold hover:underline">
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

const SignupPage = ({ onSignup, onSwitchToLogin }: { onSignup: (user: string) => void, onSwitchToLogin: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onSignup(name || email.split('@')[0]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 rounded-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join the fight against misinformation</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                required
                className="input-field pl-10" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                className="input-field pl-10" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                className="input-field pl-10" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={20} /> Create Account</>}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-brand-600 font-semibold hover:underline">
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeContent = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following content for potential misinformation or fake news. 
        Provide a detailed breakdown in JSON format with these fields:
        - isFake: boolean
        - confidence: number (0 to 100)
        - summary: short summary of the analysis
        - reasoning: detailed explanation
        - keyClaims: array of { claim: string, status: 'verified' | 'refuted' | 'unverified' }
        - sources: array of strings (potential sources or types of sources to check)

        Content to analyze:
        "${input}"`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze content. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Content Verifier</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Paste a news article, social media post, or any claim below. Our AI will analyze it for factual accuracy and potential misinformation.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-2xl mb-8">
        <div className="relative">
          <textarea 
            className="w-full min-h-[160px] p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none text-slate-800"
            placeholder="Paste content here to verify..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={() => setInput('')}
              className="px-4 py-2 text-slate-500 hover:text-slate-700 font-medium transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={analyzeContent}
              disabled={isAnalyzing || !input.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              {isAnalyzing ? 'Analyzing...' : 'Verify Now'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 mb-8"
          >
            <AlertCircle size={20} />
            <p>{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-2xl border flex flex-col md:flex-row gap-6 items-start md:items-center ${result.isFake ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${result.isFake ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {result.isFake ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className={`text-xl font-bold ${result.isFake ? 'text-amber-900' : 'text-emerald-900'}`}>
                    {result.isFake ? 'Potential Misinformation Detected' : 'Content Appears Reliable'}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${result.isFake ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'}`}>
                    {result.confidence}% Confidence
                  </span>
                </div>
                <p className={`text-sm ${result.isFake ? 'text-amber-800' : 'text-emerald-800'}`}>
                  {result.summary}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-brand-600" />
                  Detailed Reasoning
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {result.reasoning}
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Globe size={18} className="text-brand-600" />
                  Claim Breakdown
                </h4>
                <div className="space-y-3">
                  {result.keyClaims.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className={`mt-1 ${
                        item.status === 'verified' ? 'text-emerald-500' : 
                        item.status === 'refuted' ? 'text-red-500' : 'text-slate-400'
                      }`}>
                        {item.status === 'verified' ? <CheckCircle2 size={16} /> : 
                         item.status === 'refuted' ? <AlertCircle size={16} /> : <Info size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{item.claim}</p>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {result.sources && result.sources.length > 0 && (
              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <History size={18} className="text-brand-600" />
                  Recommended Verification Sources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.sources.map((source, idx) => (
                    <span key={idx} className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full border border-brand-100 flex items-center gap-1">
                      {source} <ExternalLink size={10} />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('login');
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUser(username);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main>
        {view === 'login' && (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setView('signup')} 
          />
        )}
        {view === 'signup' && (
          <SignupPage 
            onSignup={handleLogin} 
            onSwitchToLogin={() => setView('login')} 
          />
        )}
        {view === 'dashboard' && <Dashboard />}
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 mt-auto">
        <p>© 2026 VeriTrust AI. Empowering truth in the digital age.</p>
      </footer>
    </div>
  );
}
