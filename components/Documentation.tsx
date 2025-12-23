
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 prose prose-slate max-h-[80vh] overflow-y-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">MusePost Semi-Auto 要件定義 & 設計書</h1>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">1. プロダクト概要</h2>
      <p>小規模な博物館・美術館職員の「SNS発信の心理的・時間的ハードル」を解消する半自動投稿管理アプリです。AIによる原稿作成、Spreadsheetでの共同編集、Xへの連携を一つのフローで完結させます。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">2. ユーザー操作フロー</h2>
      <ol className="list-decimal pl-5 space-y-2 text-slate-700">
        <li><strong>入力：</strong> 職員がチラシやプレスリリースのURL、テキストを入力。</li>
        <li><strong>生成：</strong> Gemini APIが「公報トーン」で150文字以内の投稿案を生成。</li>
        <li><strong>連携：</strong> 生成結果を管理用Google Spreadsheetへ自動追記。</li>
        <li><strong>確認：</strong> 職員がSpreadsheet上で内容を最終確認・修正。</li>
        <li><strong>実行：</strong> アプリ画面から「投稿」をクリック。API経由、または手動コピーでXへ。</li>
      </ol>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">3. 入力データ処理設計</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>テキスト：</strong> 直接入力された文字を解析。</li>
        <li><strong>Web URL：</strong> 指定URLのページコンテンツをGeminiに読み込ませて要約。</li>
        <li><strong>ドキュメント：</strong> PDF/Word等からのテキスト抽出はGeminiのマルチモーダル機能または前処理ライブラリで対応。</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">4. X投稿生成ロジック</h2>
      <p><strong>文字数制御：</strong> 厳格に150文字以内。AIへのSystem Instructionで強制。<br />
      <strong>トーン：</strong> 「公共性・信頼性・知的好奇心」を軸とした。炎上リスク回避のため、断定的な表現や感情的な言葉遣いを抑制する指示を組み込む。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">5. Google Spreadsheet 連携設計</h2>
      <p>Google Sheets APIを使用。A列:ID, B列:生成日時, C列:タイトル, D列:本文(AI案), E列:本文(修正用), F列:状態。ユーザーはE列のみを操作することを想定。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">6. X投稿設計</h2>
      <p>X API v2 を使用。<strong>自動投稿不可の条件：</strong> APIレート制限超過、認証切れ、140文字超過（英字考慮）、画像添付要件ありの場合。代替案として「手動投稿用データ確定（クリップボードコピー）」を提供。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">7. エラー・失敗ケース</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>APIエラー：</strong> 指数バックオフによるリトライ、およびユーザーへの明確な失敗通知。</li>
        <li><strong>ハルシネーション：</strong> 生成文に「※AI生成につき要確認」のフラグを立て、人間の目視を必須化。</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">8. セキュリティ・監査設計</h2>
      <p>入力データはセッション終了後に破棄。Spreadsheet自体を監査ログとして活用。投稿履歴には操作したユーザーIDを記録可能にする。</p>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">9. MVPとして割り切る点</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>画像の自動生成・加工は含めない（著作権リスク回避）。</li>
        <li>複数アカウントの同時管理は非対応。</li>
        <li>予約投稿はSpreadsheet側での管理、または外部サービス連携を推奨。</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4 border-l-4 border-indigo-500 pl-3">10. 実装リスクと回避策</h2>
      <p><strong>リスク：</strong> X APIの突然の仕様変更・有料化。 <br />
      <strong>回避策：</strong> クリップボード経由の手動投稿UIを「プライマリな代替」として最初から組み込み、APIが死んでも業務が止まらない設計にする。</p>
      
      <div className="mt-12 bg-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto">
        <h3 className="font-bold mb-2">実装用JSONスキーマ</h3>
        <pre>{`{
  "post_schema": {
    "id": "uuid",
    "timestamp": "iso8601",
    "source": { "type": "TEXT|URL|FILE", "content": "string" },
    "output": { "title": "string(15)", "body": "string(150)" },
    "workflow": { "status": "DRAFT|SYNCED|APPROVED|POSTED|FAILED", "reviewer": "string" }
  }
}`}</pre>
      </div>
    </div>
  );
};

export default Documentation;
