
import React, { useState, useEffect } from 'react';
import { PostData, PostStatus, SourceType } from './types';
import Dashboard from './components/Dashboard';
import PostGenerator from './components/PostGenerator';
import Settings from './components/Settings';
import Documentation from './components/Documentation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'generate' | 'settings' | 'docs'>('dashboard');
  const [posts, setPosts] = useState<PostData[]>([]);

  // LocalStorageからのデータ復元
  useEffect(() => {
    const savedPosts = localStorage.getItem('musepost_data');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const savePosts = (newPosts: PostData[]) => {
    setPosts(newPosts);
    localStorage.setItem('musepost_data', JSON.stringify(newPosts));
  };

  const addPostsBatch = (newBatch: PostData[]) => {
    const updated = [...newBatch, ...posts];
    savePosts(updated);
  };

  const updatePostStatus = (id: string, status: PostStatus, additional?: Partial<PostData>) => {
    const updated = posts.map(p => p.id === id ? { ...p, status, ...additional } : p);
    savePosts(updated);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-800 leading-none">MusePost</h1>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Semi-Auto Beta</span>
            </div>
          </div>
          <nav className="flex gap-2">
            {[
              { id: 'dashboard', label: 'Board', icon: '📋' },
              { id: 'generate', label: 'Create', icon: '✨' },
              { id: 'settings', label: 'Setup', icon: '⚙️' },
              { id: 'docs', label: 'Docs', icon: '📖' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6 max-w-6xl">
        {activeTab === 'dashboard' && (
          <Dashboard posts={posts} onStatusChange={updatePostStatus} />
        )}
        {activeTab === 'generate' && (
          <PostGenerator onGenerated={addPostsBatch} onComplete={() => setActiveTab('dashboard')} />
        )}
        {activeTab === 'settings' && (
          <Settings />
        )}
        {activeTab === 'docs' && (
          <Documentation />
        )}
      </main>

      <footer className="p-8 text-center border-t border-slate-200 bg-white">
        <p className="text-xs text-slate-400 font-medium">
          Powered by Gemini AI • 公共文化施設向け発信支援ツール
        </p>
      </footer>
    </div>
  );
};

export default App;
