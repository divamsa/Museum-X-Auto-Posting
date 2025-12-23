
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 prose prose-slate max-h-[80vh] overflow-y-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 font-black tracking-tight border-b-4 border-indigo-600 pb-2 inline-block">MusePost Semi-Auto 設計書 v2</h1>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">1. プロダクト概要</h2>
      <p>小規模な博物館・美術館職員向け。AIによる原稿作成（10案一括）と、アプリ内でのダイレクトな修正・承認に特化し、Spreadsheetを介さないスピーディな運用を実現します。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">2. ユーザー操作フロー (New)</h2>
      <ol className="list-decimal pl-5 space-y-2 text-slate-700 font-medium">
        <li><strong>入力：</strong> Web URLやテキストを投入。</li>
        <li><strong>一括生成：</strong> Gemini APIが「異なる5つの視点」で計10個の投稿案を一度に生成。</li>
        <li><strong>比較・修正：</strong> ダッシュボード上に並んだ10案を比較。良い案をクリックしてその場で修正。</li>
        <li><strong>承認：</strong> 修正完了、またはそのままの内容を「承認済み」としてマーク。</li>
        <li><strong>投稿：</strong> クリップボードにコピーしてXへ投稿、またはAPI経由で投稿。</li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">3. UI/UX設計思想</h2>
      <p>
        <strong>比較可能性 (Comparability):</strong> 10個の案をカードとして並べることで、AI特有の「似たような案」や「独自の切り口」を人間が瞬時に判別可能にします。<br />
        <strong>摩擦の除去 (Frictionless):</strong> Spreadsheetを開く手間を省き、修正から投稿まで同一タブ内で完結させます。
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">4. X投稿ロジック</h2>
      <p>150文字制限をUI側でもカウンタで制御。140文字（日本語）を超過しそうな場合は警告を表示します。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">5. セキュリティ・監査</h2>
      <p>ローカルストレージにデータを保持。機密性の高い情報は扱わない前提ですが、誤投稿防止のため「承認済み」にならないと「投稿」ボタンが目立たない設計としています。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">6. MVPの割り切り</h2>
      <p>Spreadsheet連携は現在バックグラウンドでの「ログ記録」用途に限定（本デモでは非搭載）。画像プレビュー機能は次期フェーズ。</p>
    </div>
  );
};

export default Documentation;
