
import React, { useState } from 'react';
import { PostData, PostStatus } from '../types';

interface Props {
  posts: PostData[];
  onStatusChange: (id: string, status: PostStatus, additional?: Partial<PostData>) => void;
}

const Dashboard: React.FC<Props> = ({ posts, onStatusChange }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<string>('');

  const saveEdit = (id: string) => {
    onStatusChange(id, PostStatus.APPROVED, { editedBody: editBuffer });
    setEditingId(null);
  };

  const handleCopy = (post: PostData) => {
    const text = post.editedBody || post.generatedBody;
    navigator.clipboard.writeText(text).then(() => {
        onStatusChange(post.id, PostStatus.MANUAL);
    });
  };

  const latestBatch = posts.slice(0, 10);
  const archivedPosts = posts.slice(10);

  const renderPostCard = (post: PostData) => (
    <div 
      key={post.id} 
      className={`group relative bg-white border border-stone-200 rounded-[2rem] p-8 transition-all duration-500 curator-shadow ${
        editingId === post.id ? 'ring-2 ring-accent border-transparent z-10 scale-[1.02]' : 
        post.status === PostStatus.MANUAL ? 'bg-stone-50' : 'hover:-translate-y-2'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black text-accent bg-stone-100 px-4 py-1.5 rounded-full uppercase tracking-widest">
          {post.angle || 'Exhibit'}
        </span>
        <button 
            onClick={() => { setEditingId(post.id); setEditBuffer(post.editedBody || post.generatedBody); }}
            className="text-stone-300 hover:text-museum p-2 rounded-full hover:bg-stone-50 transition-colors"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        </button>
      </div>

      {editingId === post.id ? (
        <div className="space-y-4">
          <textarea 
            className="w-full p-6 bg-stone-50 border-none rounded-2xl text-base focus:ring-2 focus:ring-accent outline-none font-medium leading-relaxed min-h-[160px]"
            value={editBuffer}
            onChange={(e) => setEditBuffer(e.target.value)}
            autoFocus
          />
          <div className="flex justify-between items-center">
            <span className={`text-[10px] font-black ${editBuffer.length > 140 ? 'text-red-500' : 'text-stone-400'}`}>
              {editBuffer.length} / 150
            </span>
            <div className="flex gap-3">
              <button onClick={() => setEditingId(null)} className="text-[10px] font-black uppercase text-stone-400">Cancel</button>
              <button onClick={() => saveEdit(post.id)} className="bg-museum text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-wider">Save</button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-museum text-lg font-medium leading-[1.8] mb-8 line-clamp-6">
          {post.editedBody || post.generatedBody}
        </p>
      )}

      <div className="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-stone-300 uppercase tracking-tighter">Inventory ID</span>
          <span className="text-[10px] font-bold text-stone-400">{post.id.split('-')[0].toUpperCase()}</span>
        </div>
        <button 
          onClick={() => handleCopy(post)}
          className={`flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-black transition-all shadow-lg active:scale-95 ${
              post.status === PostStatus.MANUAL 
              ? 'bg-accent text-white shadow-accent/20' 
              : 'bg-museum text-white hover:bg-stone-800'
          }`}
        >
          {post.status === PostStatus.MANUAL ? (
            <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Copied</>
          ) : 'Copy to X'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <h2 className="text-6xl font-serif font-black text-museum tracking-tighter mb-6 italic">The Collection</h2>
          <p className="text-stone-500 text-xl font-medium leading-relaxed">
            AIが構成した10編の物語。館の静寂、興奮、あるいは知的好奇心を最もよく表す一つを選んでください。
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-40 h-40 border-2 border-stone-100 rounded-full">
           <span className="text-sm font-black text-stone-300 uppercase tracking-widest mb-1">Items</span>
           <span className="text-5xl font-serif font-black text-museum">{posts.length}</span>
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="py-40 text-center border-4 border-dashed border-stone-100 rounded-[4rem]">
          <div className="text-8xl mb-8 opacity-10">🏺</div>
          <h3 className="text-3xl font-serif font-black text-stone-300 mb-4 italic">No exhibitions found</h3>
          <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">Start by creating your first post series</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestBatch.map(renderPostCard)}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
