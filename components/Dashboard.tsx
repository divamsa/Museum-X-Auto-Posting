
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
    navigator.clipboard.writeText(text);
    onStatusChange(post.id, PostStatus.MANUAL);
    alert('コピーしました。Xの投稿画面へ貼り付けてください。');
  };

  // 生成時間（バッチ）ごとにグループ化して、最新の10個を強調表示
  const latestBatch = posts.slice(0, 10);
  const olderPosts = posts.slice(10);

  const renderPostCard = (post: PostData, isLatest: boolean) => (
    <div 
      key={post.id} 
      className={`relative bg-white border-2 rounded-2xl transition-all duration-300 ${
        editingId === post.id ? 'border-indigo-500 shadow-2xl scale-[1.02] z-10' : 
        post.status === PostStatus.DRAFT ? 'border-slate-200 hover:border-indigo-300' : 'border-green-100 bg-green-50/10'
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2 items-center">
             <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
               {post.status === PostStatus.DRAFT ? 'Draft' : 'Reviewed'}
             </span>
             {/* Note: In a real app we'd add the 'angle' to PostData too, for now we use index */}
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => { setEditingId(post.id); setEditBuffer(post.editedBody || post.generatedBody); }}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition"
              title="編集"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </button>
          </div>
        </div>

        <h3 className="font-black text-slate-800 text-sm mb-3 leading-tight truncate" title={post.generatedTitle}>
          {post.generatedTitle}
        </h3>

        {editingId === post.id ? (
          <div className="space-y-3">
            <textarea 
              className="w-full p-3 bg-slate-50 border-2 border-indigo-200 rounded-xl text-sm focus:ring-0 min-h-[120px]"
              value={editBuffer}
              onChange={(e) => setEditBuffer(e.target.value)}
              autoFocus
            />
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-black ${editBuffer.length > 140 ? 'text-red-500' : 'text-slate-400'}`}>
                {editBuffer.length} / 150文字
              </span>
              <div className="flex gap-1">
                <button onClick={() => setEditingId(null)} className="text-[10px] font-bold text-slate-400 px-2 py-1">戻る</button>
                <button onClick={() => saveEdit(post.id)} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-md">確定</button>
              </div>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => { setEditingId(post.id); setEditBuffer(post.editedBody || post.generatedBody); }}
            className="text-slate-600 text-sm leading-relaxed mb-4 cursor-pointer hover:bg-slate-50 p-2 -m-2 rounded-lg transition-colors min-h-[80px]"
          >
            {post.editedBody || post.generatedBody}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[9px] text-slate-300 font-mono tracking-tighter uppercase">ID: {post.id.split('-')[0]}</span>
          <button 
            onClick={() => handleCopy(post)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[11px] font-black shadow-lg hover:bg-indigo-600 transition-all flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v13a2 2 0 01-2 2zM7 5v4h9V5H7zm11 14V9h-2v10h2zm-4 0V9h-2v10h2zm-4 0V9H8v10h2z" /></svg>
            投稿コピー
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <section>
        <div className="flex justify-between items-end mb-8 border-b-2 border-slate-200 pb-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-2xl shadow-xl shadow-indigo-100 text-2xl">10</span>
              一括比較ボード
            </h2>
            <p className="text-slate-500 font-medium mt-2">最新の生成結果10件を並べて比較・選別できます。</p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Assets</div>
             <div className="text-3xl font-black text-slate-900">{posts.length}</div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white border-4 border-dashed border-slate-200 rounded-[3rem] p-32 text-center">
            <div className="text-7xl mb-6">🏜️</div>
            <h3 className="text-2xl font-black text-slate-300">まだ案がありません</h3>
            <p className="text-slate-400 mt-2 font-medium">上の「Create」ボタンから10個の案を一度に作らせましょう。</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {latestBatch.map(post => renderPostCard(post, true))}
            </div>
            
            {olderPosts.length > 0 && (
              <div className="mt-20">
                <h3 className="text-xl font-black text-slate-400 mb-8 border-t border-slate-200 pt-8 uppercase tracking-widest text-center">Previous Generations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 opacity-60 hover:opacity-100 transition-opacity">
                  {olderPosts.map(post => renderPostCard(post, false))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
