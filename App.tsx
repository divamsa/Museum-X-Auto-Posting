
import React, { useState, useEffect } from 'react';
import { PostData, PostStatus } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import PostGenerator from './components/PostGenerator.tsx';
import Settings from './components/Settings.tsx';
import Documentation from './components/Documentation.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'generate' | 'settings' | 'docs'>('docs'); // 初回はマニュアルを表示
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('musepost_v2_data');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const savePosts = (newPosts: PostData[]) => {
    setPosts(newPosts);
    localStorage.setItem('musepost_v2_data', JSON.stringify(newPosts));
  };

  const addPostsBatch = (newBatch: PostData[]) => {
    savePosts([...newBatch, ...posts]);
  };

  const updatePostStatus = (id: string, status: PostStatus, additional?: Partial<PostData>) => {
    const updated = posts.map(p => p.id === id ? { ...p, status, ...additional } : p);
    savePosts(updated);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-100">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">MusePost</h1>
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1 block">Cultural Facility PR Assistant</span>
            </div>
          </div>
          
          <nav className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
            {[
              { id: 'docs', label: 'マニュアル', icon: '🔰' },
              { id: 'generate', label: 'つくる', icon: '✨' },
              { id: 'dashboard', label: '選ぶ・送る', icon: '📋' },
              { id: 'settings', label: '設定', icon: '⚙️' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                  activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-8">
        {activeTab === 'dashboard' && <Dashboard posts={posts} onStatusChange={updatePostStatus} />}
        {activeTab === 'generate' && <PostGenerator onGenerated={addPostsBatch} onComplete={() => setActiveTab('dashboard')} />}
        {activeTab === 'docs' && <Documentation />}
        {activeTab === 'settings' && <Settings />}
      </main>

      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-slate-400">
          <p className="text-xs font-bold">© 2025 MusePost Project. Windows Edge/Chrome Optimized.</p>
          <p className="text-[10px] uppercase font-black tracking-[0.2em]">Safety & Humanity Focused</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
