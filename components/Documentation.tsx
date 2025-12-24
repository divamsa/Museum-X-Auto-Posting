
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-10 prose prose-slate max-h-[80vh] overflow-y-auto selection:bg-indigo-100">
      
      {/* 初心者向けマニュアルセクション */}
      <section className="mb-16 border-b-2 border-slate-100 pb-12">
        <div className="bg-indigo-600 text-white p-8 rounded-[2rem] mb-10 shadow-lg shadow-indigo-100">
          <h1 className="text-3xl font-black mb-2 text-white border-none">🔰 はじめての MusePost 操作ガイド</h1>
          <p className="text-indigo-100 font-medium m-0">
            このアプリは、博物館・美術館の「お知らせ」をX（Twitter）用に変換するお手伝いをします。
            PC（Windows/Mac）のブラウザで、以下の5つのステップに沿って進めるだけです。
          </p>
        </div>

        <div className="space-y-12">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl shrink-0">1</div>
            <div>
              <h3 className="text-xl font-black text-slate-800 m-0 mb-2">「Create (作成)」タブを開く</h3>
              <p className="text-slate-600 leading-relaxed">
                画面上のメニューから「✨ Create」を選びます。ここが文章を作る入り口です。
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl shrink-0">2</div>
            <div>
              <h3 className="text-xl font-black text-slate-800 m-0 mb-2">情報を入力する</h3>
              <p className="text-slate-600 leading-relaxed">
                チラシの文章や、展示の紹介文をコピーして、大きな白い枠（Source Content）に貼り付けます。<br />
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold">ポイント</span> 
                「テキスト入力」を選んでいれば、短いメモ書きからでも作成可能です。
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl shrink-0">3</div>
            <div>
              <h3 className="text-xl font-black text-slate-800 m-0 mb-2">「10案生成」ボタンを押す</h3>
              <p className="text-slate-600 leading-relaxed">
                一番下の紫色のボタンを押すと、AIが動き始めます。約10秒〜20秒ほどで、10個の異なる「切り口」の案ができあがります。
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl shrink-0">4</div>
            <div>
              <h3 className="text-xl font-black text-slate-800 m-0 mb-2">「Board (ボード)」で比較する</h3>
              <p className="text-slate-600 leading-relaxed">
                できあがった10個のカードが並んでいます。
                「見どころ紹介風」「クイズ風」「お子様向け」など、AIが考えた案を読み比べて、一番イメージに近いものを選びます。
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black text-xl shrink-0">5</div>
            <div>
              <h3 className="text-xl font-black text-slate-800 m-0 mb-2">修正して投稿する</h3>
              <p className="text-slate-600 leading-relaxed font-bold text-indigo-700">
                ここが一番重要です！必ず人間の目で内容（日付、場所、展示名）が合っているか確認してください。
              </p>
              <ul className="text-sm text-slate-600 mt-2 list-disc pl-5">
                <li>「編集する」ボタンを押すと、その場で文章を書き直せます。</li>
                <li>「コピーしてXへ」ボタンを押すと、文章がPCに保存されます。</li>
                <li>あとは、いつものようにXを開いて「貼り付け（右クリックまたはCtrl+V）」して投稿するだけです！</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
          <h4 className="text-sm font-black text-slate-700 mb-2 flex items-center gap-2">
            <span className="text-lg">💡</span> IT担当者・広報担当者へのお願い
          </h4>
          <p className="text-xs text-slate-500 m-0 leading-relaxed">
            このツールは「自動投稿」を目的としたものではなく、忙しい職員さんの「下書き作成時間をゼロにする」ためのものです。
            最後は必ず職員さんの手で内容を確認して、館の雰囲気に合わせて微調整することをお勧めしてください。
          </p>
        </div>
      </section>

      {/* 技術・システム仕様セクション */}
      <h2 className="text-2xl font-black text-slate-900 mb-6 border-b-4 border-slate-900 pb-2 inline-block">システム詳細・設計仕様書 v2.5</h2>

      <h3 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">1. コンセプト：人間中心の半自動化</h3>
      <p>
        小規模な公共文化施設における「SNS運用への心理的抵抗」と「ハルシネーション（AIの嘘）」のリスクを最小化するため、
        あえて**「AIが10案出し、人間が1つ選んで修正する」**というワークフローを固定化しています。
      </p>

      <h3 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">2. 10案一括生成の意図</h3>
      <p>
        AIに「1つだけ完璧な案を作れ」と指示するのではなく、あえて「異なる視点から10案」作らせることで、
        ユーザー（職員）に「比較して選ぶ」という主導権を与えます。これにより、AIの出力に対する無意識な盲信を防ぎ、
        必然的に「内容を精査する」というフローを自然な形で組み込んでいます。
      </p>

      <h3 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">3. 動作環境・互換性</h3>
      <p>
        本アプリは最新のWeb技術（React 19, Gemini 3-flash）を用いて構築されています。
        <strong>Windows 10/11 の Microsoft Edge / Google Chrome</strong> での動作を確認済みです。
        特定のソフトウェアのインストールは不要で、ブラウザのみで動作するため、行政ネットワーク等の制限された環境でも導入が容易です。
      </p>

      <h3 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">4. 入力データの制限と安全性</h3>
      <p>
        <strong>入力：</strong> 公開済みのWebサイトURL、イベント情報テキスト。<br />
        <strong>除外：</strong> 個人情報、未発表の研究データ、内部会議資料。<br />
        <strong>リスク管理：</strong> AIによる生成文には、公的機関として不適切な過激な表現、政治的・宗教的な偏りを抑制する厳格なプロンプト（指示）が組み込まれています。
      </p>

      <h3 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">5. 今後のアップデート予定 (Roadmap)</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>画像の自動リサイズ・プレビュー機能。</li>
        <li>過去の「反応が良かった投稿」を元にしたトーン学習。</li>
        <li>他部署との共有用「承認ステータス」の外部連携。</li>
      </ul>

      <div className="mt-12 bg-slate-900 p-8 rounded-[2rem] font-mono text-xs overflow-x-auto text-indigo-300">
        <h3 className="font-bold mb-4 text-white uppercase tracking-widest text-[10px] border-b border-indigo-900 pb-2">Technical Implementation Schema</h3>
        <pre>{`{
  "system_role": "Public Museum PR Assistant",
  "ai_model": "Gemini 3 Flash (Latest)",
  "batch_size": 10,
  "output_constraints": {
    "title_limit": 15,
    "body_limit": 150,
    "safety_filter": "high",
    "tone": "Academic yet accessible"
  }
}`}</pre>
      </div>
    </div>
  );
};

export default Documentation;
