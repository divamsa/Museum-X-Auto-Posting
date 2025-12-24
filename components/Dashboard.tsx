
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
    alert('クリップボードにコピーしました！X（Twitter）の投稿画面で貼り付けてください。');
  };

  // 最新の10個を「一括生成結果」として強調
  const latestBatch = posts.slice(0, 10);
  const archivedPosts = posts.slice(10);

  const renderPostCard = (post: PostData) => (
    <div 
      key={post.id} 
      className={`group bg-white border-2 rounded-2xl transition-all ${
        editingId === post.id ? 'border-indigo-500 shadow-xl' : 
        post.status === PostStatus.DRAFT ? 'border-slate-100 hover:border-indigo-200' : 'border-green-100 bg-green-50/10'
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
            {post.angle || 'Draft'}
          </span>
          <button 
            onClick={() => { setEditingId(post.id); setEditBuffer(post.editedBody || post.generatedBody); }}
            className="text-slate-400 hover:text-indigo-600 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
        </div>

        {editingId === post.id ? (
          <div className="space-y-3">
            <textarea 
              className="w-full p-3 bg-slate-50 border-2 border-indigo-200 rounded-xl text-sm focus:ring-0 min-h-[100px]"
              value={editBuffer}
              onChange={(e) => setEditBuffer(e.target.value)}
              autoFocus
            />
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-bold ${editBuffer.length > 140 ? 'text-red-500' : 'text-slate-400'}`}>
                {editBuffer.length} / 150文字
              </span>
              <div className="flex gap-1">
                <button onClick={() => setEditingId(null)} className="text-[10px] font-bold text-slate-400 px-2">戻る</button>
                <button onClick={() => saveEdit(post.id)} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-md">保存</button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap min-h-[60px]">
            {post.editedBody || post.generatedBody}
          </p>
        )}

        <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
          <span className="text-[9px] text-slate-300 font-mono tracking-tighter uppercase">{post.id.split('-')[0]}</span>
          <button 
            onClick={() => handleCopy(post)}
            className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-[11px] font-black hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            本文をコピー
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">一括比較ボード</h2>
          <p className="text-slate-500 font-medium mt-1">生成された10個の案から、最適なものを選別してください。</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Assets</div>
          <div className="text-4xl font-black text-slate-900">{posts.length}</div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border-4 border-dashed border-slate-200 rounded-[3rem] p-32 text-center">
          <div className="text-7xl mb-6">🖋️</div>
          <h3 className="text-2xl font-black text-slate-300">まだ投稿データがありません</h3>
          <p className="text-slate-400 mt-2">「Create」メニューから10個の案を生成してください。</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestBatch.map(renderPostCard)}
          </div>

          {archivedPosts.length > 0 && (
            <div className="mt-20">
              <h3 className="text-xl font-black text-slate-300 mb-8 border-t border-slate-200 pt-8 uppercase tracking-[0.3em] text-center">Previous Generations</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 opacity-50 hover:opacity-100 transition-opacity">
                {archivedPosts.map(renderPostCard)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
