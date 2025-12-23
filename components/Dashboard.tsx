
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

  const startEditing = (post: PostData) => {
    setEditingId(post.id);
    setEditBuffer(post.editedBody || post.generatedBody);
  };

  const handleCopy = (post: PostData) => {
    const text = post.editedBody || post.generatedBody;
    navigator.clipboard.writeText(text);
    onStatusChange(post.id, PostStatus.MANUAL);
    alert('クリップボードにコピーしました。そのままXへ貼り付けられます。');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <span className="text-indigo-600">📋</span> 投稿案の比較・選別
          </h2>
          <p className="text-slate-500 text-sm mt-1">生成された10個の案から、館の運用に合うものを選んでください。</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl text-center">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Active Posts</div>
          <div className="text-2xl font-black text-indigo-600">{posts.length}</div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-24 text-center">
          <div className="text-6xl mb-6">🖋️</div>
          <h3 className="text-xl font-bold text-slate-400">まだ投稿データがありません</h3>
          <p className="text-slate-400 mt-2">「Create」メニューからAIに10案作成させてください</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className={`group bg-white border-2 transition-all overflow-hidden rounded-xl ${
                editingId === post.id ? 'border-indigo-400 ring-4 ring-indigo-50 shadow-xl' : 
                post.status === PostStatus.DRAFT ? 'border-slate-100 hover:border-indigo-200' : 'border-green-100 bg-green-50/20'
              }`}
            >
              <div className="flex items-stretch">
                {/* 番号ラベル */}
                <div className={`w-12 flex items-center justify-center font-black text-lg ${
                  post.status === PostStatus.DRAFT ? 'bg-slate-50 text-slate-300' : 'bg-green-100 text-green-600'
                }`}>
                  {posts.length - index}
                </div>

                <div className="flex-grow p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 text-sm">
                      {post.generatedTitle}
                    </h3>
                    <div className="flex items-center gap-2">
                      {post.status === PostStatus.APPROVED && <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">確認済</span>}
                      {post.status === PostStatus.MANUAL && <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">コピー済</span>}
                    </div>
                  </div>

                  {editingId === post.id ? (
                    <div className="space-y-3">
                      <textarea 
                        className="w-full p-3 bg-slate-50 border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                        value={editBuffer}
                        onChange={(e) => setEditBuffer(e.target.value)}
                        autoFocus
                      />
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-bold ${editBuffer.length > 140 ? 'text-red-500' : 'text-slate-400'}`}>
                          {editBuffer.length} / 150 文字
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingId(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600">キャンセル</button>
                          <button onClick={() => saveEdit(post.id)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-indigo-700">修正を確定</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {post.editedBody || post.generatedBody}
                    </p>
                  )}
                </div>

                {/* アクションパネル */}
                <div className="w-40 bg-slate-50/50 border-l border-slate-100 p-3 flex flex-col justify-center gap-2">
                  {editingId !== post.id && (
                    <>
                      <button 
                        onClick={() => startEditing(post)}
                        className="w-full py-1.5 px-3 bg-white border border-slate-200 text-slate-600 text-[11px] font-bold rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
                      >
                        編集する
                      </button>
                      <button 
                        onClick={() => handleCopy(post)}
                        className="w-full py-1.5 px-3 bg-indigo-600 text-white text-[11px] font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition"
                      >
                        コピーしてXへ
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
