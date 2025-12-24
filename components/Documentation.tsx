
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-10 prose prose-slate max-h-[85vh] overflow-y-auto selection:bg-indigo-100">
      
      {/* 超初心者向けマニュアル */}
      <section className="mb-16 border-b-2 border-slate-100 pb-12">
        <div className="bg-indigo-600 text-white p-8 rounded-[2rem] mb-10 shadow-lg shadow-indigo-100">
          <h1 className="text-3xl font-black mb-2 text-white border-none">🔰 はじめての MusePost マニュアル</h1>
          <p className="text-indigo-100 font-medium m-0">
            このアプリは、博物館・美術館の「お知らせ」をX（Twitter）用に変換するお手伝いをします。<br />
            難しい設定は不要です。以下の5つのステップで進めましょう。
          </p>
        </div>

        <div className="grid gap-8">
          {[
            { step: "1", title: "「Create (作成)」を押す", desc: "上のメニューにある「✨ Create」をクリックして、入力画面を開きます。" },
            { step: "2", title: "内容を貼り付ける", desc: "チラシの文章やHPのURLをコピーして、大きな白い枠の中に貼り付けます。" },
            { step: "3", title: "AIにまかせる", desc: "「10案を一括生成」ボタンを押して、10秒〜20秒ほど待ちます。" },
            { step: "4", title: "10個の中から選ぶ", desc: "「Board (ボード)」に10個の案が並びます。切り口の違う案から、館の雰囲気に合うものを選びます。" },
            { step: "5", title: "修正してコピー", desc: "「編集」で日付や内容を最終確認し、「コピー」してX（Twitter）に貼り付ければ完了です！" }
          ].map((item) => (
            <div key={item.step} className="flex gap-6 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 m-0 mb-1">{item.title}</h3>
                <p className="text-slate-600 m-0 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-amber-50 rounded-2xl border-2 border-amber-100">
          <h4 className="text-amber-800 font-black flex items-center gap-2 m-0 mb-2">
            ⚠️ 運用上の大切なルール
          </h4>
          <p className="text-amber-700 text-sm m-0 leading-relaxed">
            AIは時々、間違った情報（嘘）を混ぜることがあります。<strong>日付、時間、場所、展示名</strong>が元データと合っているか、必ず最後に人間の目でチェックしてください。
          </p>
        </div>
      </section>

      {/* 管理者向け技術詳細 */}
      <h2 className="text-2xl font-black text-slate-900 mb-6 border-b-4 border-slate-900 pb-2 inline-block">管理者向け仕様書</h2>
      
      <h3 className="font-bold">1. 動作環境</h3>
      <p>Windows 10/11 (Microsoft Edge / Google Chrome) での動作に最適化されています。</p>

      <h3 className="font-bold">2. データ保持</h3>
      <p>生成した投稿案はブラウザの保存領域（LocalStorage）に一時保存されます。ブラウザを閉じてもデータは消えませんが、シークレットモードでは保存されません。</p>

      <h3 className="font-bold">3. X（Twitter）投稿について</h3>
      <p>現在は「手動コピー＆ペースト」を推奨しています。APIの制限や予期せぬエラー（炎上リスク等）を避けるための安全設計です。</p>

      <div className="mt-12 bg-slate-900 p-8 rounded-[2rem] font-mono text-xs text-indigo-300">
        <pre>{`{
  "app_version": "2.5.0-Final",
  "ai_model": "gemini-3-flash-preview",
  "batch_limit": 10,
  "supported_os": ["Windows", "MacOS"]
}`}</pre>
      </div>
    </div>
  );
};

export default Documentation;
