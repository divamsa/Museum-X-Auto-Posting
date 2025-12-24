
import React, { useState } from 'react';
import { PostData, PostStatus, SourceType } from '../types';
import { generateXPost } from '../services/gemini';

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
      setError(err.message || '予期せぬエラーが発生しました。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
      <div className="bg-slate-900 p-10 text-white relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
        </div>
        <h2 className="text-4xl font-black tracking-tight mb-2">10案を一括生成</h2>
        <p className="text-slate-400 text-lg font-medium">
          情報をひとつ入れるだけで、10通りの切り口をAIが提案します。
        </p>
      </div>

      <div className="p-10">
        <div className="mb-10">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Select Source Type</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: SourceType.TEXT, label: 'テキスト入力', icon: '🖋️' },
              { id: SourceType.URL, label: 'Web URL', icon: '🌐' },
              { id: SourceType.FILE, label: 'ファイル貼付', icon: '📄' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSourceType(type.id)}
                className={`p-6 rounded-3xl border-2 font-black text-sm transition-all flex flex-col items-center gap-3 ${
                  sourceType === type.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <span className="text-3xl">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Content for analysis
            </label>
            <textarea
              className="w-full h-56 p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm leading-relaxed outline-none"
              placeholder={sourceType === SourceType.URL ? 'https://museum.example.jp/exhibition' : '告知文、プレスリリース、チラシの文章などをここに貼り付けてください...'}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-50 text-red-600 border-l-8 border-red-500 rounded-2xl text-sm font-black">
              {error}
            </div>
          )}

          <div className="flex gap-6">
            <button
              type="button"
              onClick={onComplete}
              className="px-8 py-5 font-black text-slate-400 hover:text-slate-600 transition uppercase tracking-widest text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating || !inputContent.trim()}
              className={`flex-grow py-5 rounded-3xl text-white font-black shadow-2xl transition-all flex items-center justify-center gap-4 text-lg ${
                isGenerating || !inputContent.trim() ? 'bg-slate-200 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>10案を生成しています...</span>
                </>
              ) : (
                <>
                  <span>✨ 投稿案を10個一括生成</span>
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
