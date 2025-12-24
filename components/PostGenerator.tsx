
import React, { useState } from 'react';
import { PostData, PostStatus, SourceType } from '../types.ts';
import { generateXPost } from '../services/gemini.ts';

interface Props {
  onGenerated: (posts: PostData[]) => void;
  onComplete: () => void;
}

const PostGenerator: React.FC<Props> = ({ onGenerated, onComplete }) => {
  const [sourceType, setSourceType] = useState<SourceType>(SourceType.TEXT);
  const [inputContent, setInputContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const results = await generateXPost(inputContent, sourceType);
      
      const newPosts: PostData[] = results.map((result) => ({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        sourceType,
        sourceContent: inputContent.length > 50 ? inputContent.substring(0, 50) + '...' : inputContent,
        generatedTitle: result.title,
        generatedBody: result.body,
        angle: result.angle,
        status: PostStatus.DRAFT,
      }));

      onGenerated(newPosts);
      onComplete();
    } catch (err: any) {
      setError(err.message || '通信エラーが発生しました。インターネット接続を確認してください。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 p-10 text-white relative">
        <h2 className="text-4xl font-black tracking-tight mb-2">10案を一括作成</h2>
        <p className="text-slate-400 text-lg font-medium">
          チラシの文章などを入れるだけで、AIが10通りの投稿案を作ります。
        </p>
      </div>

      <div className="p-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-10 text-center">
             <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl gap-2">
                {[
                  { id: SourceType.TEXT, label: '文章を入力', icon: '🖋️' },
                  { id: SourceType.URL, label: 'URLを貼る', icon: '🌐' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSourceType(type.id)}
                    className={`px-8 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${
                      sourceType === type.id ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <span>{type.icon}</span> {type.label}
                  </button>
                ))}
             </div>
          </div>

          <div className="mb-10">
            <textarea
              className="w-full h-64 p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-base leading-relaxed outline-none"
              placeholder={sourceType === SourceType.URL ? 'https://example.jp/event' : 'ここに展示会の紹介文などを貼り付けてください...'}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-50 text-red-600 border-l-8 border-red-500 rounded-2xl text-sm font-bold">
              {error}
            </div>
          )}

          <div className="flex gap-6">
            <button
              type="submit"
              disabled={isGenerating || !inputContent.trim()}
              className={`flex-grow py-6 rounded-[2rem] text-white font-black shadow-2xl transition-all flex items-center justify-center gap-4 text-xl ${
                isGenerating || !inputContent.trim() ? 'bg-slate-200 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isGenerating ? "生成中... (20秒ほどかかります)" : "✨ 10通りの案を作る"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostGenerator;
