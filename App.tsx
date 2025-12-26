import React, { useState, useEffect, useCallback } from 'react';
import { PostData, PostStatus } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import PostGenerator from './components/PostGenerator.tsx';
import Settings from './components/Settings.tsx';
import Documentation from './components/Documentation.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docs' | 'generate' | 'dashboard' | 'settings'>('docs');
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // 期限チェック: 2026年1月31日 23:59:59
    const expiryDate = new Date('2026-01-31T23:59:59').getTime();
    const now = new Date().getTime();
    
    if (now > expiryDate) {
      setIsExpired(true);
      return;
    }

    const saved = localStorage.getItem('musepost_v3_5_store');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error("Local storage load failed", e);
      }
    }
  }, []);

  const savePosts = useCallback((newPosts: PostData[]) => {
    setPosts(newPosts);
    localStorage.setItem('musepost_v3_5_store', JSON.stringify(newPosts));
  }, []);

  const addPostsBatch = useCallback((newBatch: PostData[]) => {
    setPosts(prevPosts => {
      const updated = [...newBatch, ...prevPosts];
      localStorage.setItem('musepost_v3_5_store', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updatePostStatus = useCallback((id: string, status: PostStatus, additional?: Partial<PostData>) => {
    setPosts(prevPosts => {
      const updated = prevPosts.map(p => p.id === id ? { ...p, status, ...additional } : p);
      localStorage.setItem('musepost_v3_5_store', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 期限切れ時の「閉館」画面
  if (isExpired) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-10 font-serif">
        <div className="max-w-2xl w-full border border-gold/30 bg-navy p-16 rounded-[1rem] text-center space-y-10 relative overflow-hidden shadow-[0_0_100px_rgba(197,160,89,0.1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold"></div>
          
          <div className="space-y-4">
            <h2 className="text-gold text-sm font-black uppercase tracking-[0.4em]">Notification</h2>
            <h1 className="text-white text-4xl font-black tracking-tighter italic">閉館のお知らせ</h1>
          </div>

          <div className="w-12 h-12 border-t border-gold mx-auto opacity-30"></div>

          <p className="text-stone-400 text-lg leading-loose font-medium">
            MusePostをご利用いただき、誠にありがとうございます。<br />
            本システムの提供期間は <span className="text-white">2026年1月31日</span> をもって<br />
            終了いたしました。
          </p>

          <p className="text-stone-500 text-sm leading-relaxed">
            これまでの皆様の広報活動への多大なる貢献に、心より感謝申し上げます。<br />
            生成されたデータが必要な場合は、ブラウザのキャッシュをクリアする前に<br />
            各投稿内容を別途保存してください。
          </p>

          <div className="pt-10">
            <div className="inline-flex items-center gap-4 text-gold/50 text-[10px] uppercase tracking-[0.2em] font-black">
              <span>Cultural Heritage Intelligence</span>
              <span className="w-1 h-1 bg-gold/50 rounded-full"></span>
              <span>Finalized</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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