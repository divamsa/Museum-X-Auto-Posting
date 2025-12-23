
import React, { useState } from 'react';
import { PostData, PostStatus, SourceType } from '../types';
import { generateXPost } from '../services/gemini';

interface Props {
  onGenerated: (posts: PostData[]) => void; // 複数形に変更
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
      
      const newPosts: PostData[] = results.map((result, index) => ({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        sourceType,
        sourceContent: inputContent.length > 50 ? inputContent.substring(0, 50) + '...' : inputContent,
        generatedTitle: result.title,
        generatedBody: result.body,
        status: PostStatus.DRAFT,
      }));

      onGenerated(newPosts); // 10個一括で送信
      onComplete();
    } catch (err: any) {
      setError(err.message || '予期せぬエラーが発生しました。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-indigo-600 p-8 text-white">
        <h2 className="text-3xl font-black tracking-tight mb-2">10案一括生成</h2>
        <p className="text-indigo-100 text-sm opacity-80">
          ひとつの入力から、AIが10パターンのバリエーションを作成します。
        </p>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Input Type</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: SourceType.TEXT, label: 'テキスト', icon: '📝' },
              { id: SourceType.URL, label: 'Web URL', icon: '🔗' },
              { id: SourceType.FILE, label: 'ファイル', icon: '📁' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSourceType(type.id)}
                className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                  sourceType === type.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <span className="text-2xl">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
              Source Content
            </label>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm leading-relaxed"
              placeholder={sourceType === SourceType.URL ? 'https://...' : 'ここにお知らせやチラシの内容を貼り付けてください...'}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border-l-4 border-red-500 rounded text-sm font-bold">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onComplete}
              className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={isGenerating || !inputContent.trim()}
              className={`flex-[2] py-4 rounded-2xl text-white font-black shadow-lg transition-all flex items-center justify-center gap-3 ${
                isGenerating || !inputContent.trim() ? 'bg-slate-200' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>10パターンの案を作成中...</span>
                </>
              ) : (
                <>
                  <span>✨ 10案を一括生成する</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostGenerator;
