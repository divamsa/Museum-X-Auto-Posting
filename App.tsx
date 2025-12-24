
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
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-morphism border-b border-stone-200 py-4 px-10">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-museum flex items-center justify-center rounded-full curator-shadow group cursor-pointer transition-transform hover:rotate-12">
              <span className="text-white font-serif text-3xl font-black">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-black tracking-tight leading-none text-museum">MusePost</h1>
              <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mt-2">The Curator's Companion</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 bg-stone-100/50 p-1.5 rounded-full">
            {[
              { id: 'docs', label: 'Guide', icon: '🔰' },
              { id: 'generate', label: 'Compose', icon: '✨' },
              { id: 'dashboard', label: 'Gallery', icon: '📋' },
              { id: 'settings', label: 'Archive', icon: '⚙️' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-3 rounded-full text-xs font-extrabold transition-all flex items-center gap-3 ${
                  activeTab === tab.id 
                  ? 'bg-museum text-white shadow-xl' 
                  : 'text-stone-500 hover:text-museum hover:bg-stone-200'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-[1600px] mx-auto w-full px-10 py-16">
        <div className="animate-in fade-in zoom-in-95 duration-1000">
            {activeTab === 'dashboard' && <Dashboard posts={posts} onStatusChange={updatePostStatus} />}
            {activeTab === 'generate' && <PostGenerator onGenerated={addPostsBatch} onComplete={() => setActiveTab('dashboard')} />}
            {activeTab === 'docs' && <Documentation />}
            {activeTab === 'settings' && <Settings />}
        </div>
      </main>

      <footer className="bg-museum text-stone-400 py-20 px-10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-white font-serif text-2xl font-black mb-2 italic">MusePost v3.5</h2>
            <p className="text-sm font-medium opacity-60">Empowering Cultural Storytelling through Intelligence.</p>
          </div>
          <div className="flex gap-10">
            <div className="text-center md:text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-accent">Status</p>
              <p className="text-white font-bold text-xs uppercase">All Systems Operational</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
