import React, { useState, useEffect } from 'react';
import { PostData, PostStatus } from './types';
import Dashboard from './components/Dashboard';
import PostGenerator from './components/PostGenerator';
import Settings from './components/Settings';
import Documentation from './components/Documentation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docs' | 'generate' | 'dashboard' | 'settings'>('docs');
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('musepost_v3_5_store');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error("Local storage load failed", e);
      }
    }
  }, []);

  const savePosts = (newPosts: PostData[]) => {
    setPosts(newPosts);
    localStorage.setItem('musepost_v3_5_store', JSON.stringify(newPosts));
  };

  const addPostsBatch = (newBatch: PostData[]) => {
    savePosts([...newBatch, ...posts]);
  };

  const updatePostStatus = (id: string, status: PostStatus, additional?: Partial<PostData>) => {
    const updated = posts.map(p => p.id === id ? { ...p, status, ...additional } : p);
    savePosts(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="sticky top-0 z-50 glass-morphism py-5 px-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-navy flex items-center justify-center rounded-xl shadow-xl shadow-navy/10 transition-transform hover:rotate-6">
              <span className="text-white font-serif text-2xl font-black">M</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-extrabold tracking-tight leading-none text-navy">MusePost</h1>
              <p className="text-[9px] font-black text-gold uppercase tracking-[0.2em] mt-1.5">Curator's Digital Assistant</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 bg-stone-100/50 p-1 rounded-full">
            {[
              { id: 'docs', label: 'Guide', icon: '🔰' },
              { id: 'generate', label: 'Compose', icon: '✨' },
              { id: 'dashboard', label: 'Archive', icon: '📋' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                  ? 'bg-navy text-white shadow-lg' 
                  : 'text-stone-500 hover:text-navy hover:bg-stone-200'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-10 py-12">
        <div className="animate-in fade-in duration-700">
            {activeTab === 'dashboard' && <Dashboard posts={posts} onStatusChange={updatePostStatus} />}
            {activeTab === 'generate' && <PostGenerator onGenerated={addPostsBatch} onComplete={() => setActiveTab('dashboard')} />}
            {activeTab === 'docs' && <Documentation />}
            {activeTab === 'settings' && <Settings />}
        </div>
      </main>

      <footer className="bg-navy text-stone-500 py-16 px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-white font-serif text-xl font-bold italic mb-1">MusePost</h2>
            <p className="text-xs font-medium opacity-50 uppercase tracking-widest">Cultural Heritage Intelligence</p>
          </div>
          <div className="text-right text-[10px] font-bold uppercase tracking-widest opacity-40">
            &copy; 2025 Digital Curator Support System
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;