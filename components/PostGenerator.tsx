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
        sourceContent: inputContent.length > 100 ? inputContent.substring(0, 100) + '...' : inputContent,
        generatedTitle: result.title,
        generatedBody: result.body,
        angle: result.angle,
        status: PostStatus.DRAFT,
      }));
      onGenerated(newPosts);
      onComplete();
    } catch (err: any) {
      setError(err.message || 'AIとの通信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-museum p-16 md:p-24 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="relative z-10 text-center space-y-8">
          <h2 className="text-7xl font-serif font-black italic tracking-tighter mb-4">Craft 10 Verses</h2>
          <p className="text-xl text-stone-300 font-medium max-w-2xl mx-auto leading-relaxed">
            チラシの草案や、展示の核心。たった一つの情報から、10の視点をAIが紡ぎ出します。
          </p>
          
          <div className="flex justify-center pt-10">
             <div className="bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10 flex gap-2">
                {[
                  { id: SourceType.TEXT, label: 'Text', icon: '✎' },
                  { id: SourceType.URL, label: 'URL', icon: '🌍' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSourceType(type.id)}
                    className={`px-10 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all ${
                      sourceType === type.id ? 'bg-accent text-white shadow-xl shadow-accent/20' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="mt-[-80px] px-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-12 border border-stone-100 shadow-xl">
          <textarea
            className="w-full h-80 p-10 bg-stone-50 border-none rounded-[2.5rem] focus:ring-4 focus:ring-accent/10 transition-all text-xl font-medium leading-relaxed outline-none mb-10 placeholder:text-stone-300 shadow-inner"
            placeholder={sourceType === SourceType.URL ? 'Enter exhibition URL...' : '展示の概要、学芸員の想い、チラシの文章などをここに...'}
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            disabled={isGenerating}
          />

          {error && (
            <div className="mb-10 p-8 bg-red-50 text-red-700 rounded-3xl text-sm font-bold flex items-center gap-4">
              <span className="text-2xl">⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isGenerating || !inputContent.trim()}
            className={`w-full py-10 rounded-[2.5rem] text-white font-black text-2xl uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-6 ${
              isGenerating || !inputContent.trim() ? 'bg-stone-100 text-stone-300' : 'bg-museum hover:bg-stone-800 active:scale-95 shadow-museum/30'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center gap-5">
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="italic font-serif">Curating Ideas...</span>
              </div>
            ) : (
              <>
                <span className="text-3xl">✨</span>
                <span>Generate 10 Proposals</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostGenerator;