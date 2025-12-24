
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-10 prose prose-slate max-h-[85vh] overflow-y-auto selection:bg-indigo-100 scroll-smooth">
      
      {/* かんたん操作ガイド */}
      <section className="mb-16 border-b-2 border-slate-100 pb-12">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10 rounded-[2.5rem] mb-12 shadow-xl shadow-indigo-100">
          <h1 className="text-4xl font-black mb-4 text-white border-none leading-tight">🔰 MusePost かんたんガイド</h1>
          <p className="text-indigo-100 text-lg font-medium m-0 leading-relaxed">
            このアプリは、博物館・美術館の職員さんが「X（Twitter）の投稿を作る時間」をゼロにするための道具です。
            Windowsの Edge や Chrome でそのまま使えます。
          </p>
        </div>

        <div className="space-y-10">
          {[
            { 
              step: "1", 
              title: "「つくる」ボタンを押す", 
              desc: "上のメニューにある「✨ つくる」をクリックします。ここが作業の始まりです。" 
            },
            { 
              step: "2", 
              title: "文章を貼り付ける", 
              desc: "チラシの文章や、展示の紹介文をコピーして大きな枠に貼り付けます。短いメモ書きでも大丈夫です。" 
            },
            { 
              step: "3", 
              title: "AIに10案作らせる", 
              desc: "一番下の大きなボタンを押すと、AIが動き出します。20秒ほどで10個の異なる案ができあがります。" 
            },
            { 
              step: "4", 
              title: "一番良いものを選ぶ", 
              desc: "「選ぶ・送る」画面に切り替わります。10個の中から、館の雰囲気に一番近いものを見つけてください。" 
            },
            { 
              step: "5", 
              title: "コピーしてXへ貼り付け", 
              desc: "「本文をコピー」ボタンを押すと文章が保存されます。あとはX（Twitter）を開いて、貼り付ける（右クリック→貼り付け）だけで完了です！" 
            }
          ].map((item) => (
            <div key={item.step} className="flex gap-8 items-start bg-slate-50 p-8 rounded-3xl border border-slate-100 transition-hover hover:border-indigo-200 group">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                {item.step}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 m-0 mb-2">{item.title}</h3>
                <p className="text-slate-600 m-0 leading-relaxed text-lg font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-amber-50 rounded-3xl border-2 border-amber-200">
          <h4 className="text-amber-800 font-black text-xl flex items-center gap-3 m-0 mb-3">
            ⚠️ 使うときのお願い
          </h4>
          <p className="text-amber-700 text-base m-0 leading-relaxed font-bold">
            AIは、時々間違った「日付」や「場所」を書くことがあります。
            投稿する前に、必ず人間の目で内容が合っているか確認してください。
          </p>
        </div>
      </section>

      {/* 技術仕様 */}
      <h2 className="text-3xl font-black text-slate-900 mb-8 border-b-4 border-slate-900 pb-2 inline-block">管理者向け仕様</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-2">動作環境</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Windows 10/11 の Microsoft Edge または Google Chrome 最新版で動作します。
            インターネット接続が必要です。
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-2">データ保存</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            生成したデータは、お使いのブラウザの「ローカルストレージ」に保存されます。
            ブラウザを閉じてもデータは残り続けます。
          </p>
        </div>
      </div>

      <div className="mt-12 bg-slate-900 p-8 rounded-[2.5rem] font-mono text-xs text-indigo-300">
        <h4 className="text-white font-bold mb-4 uppercase tracking-widest">Technical Metadata</h4>
        <pre>{`{
  "system": "MusePost-v2.5-Final",
  "engine": "Gemini-3-Flash",
  "optimization": "Windows Static Hosting",
  "browser_support": "Modern ESM compliant browsers",
  "last_check": "2025-05-20"
}`}</pre>
      </div>
    </div>
  );
};

export default Documentation;
