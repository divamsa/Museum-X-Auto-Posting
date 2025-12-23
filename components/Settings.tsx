
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">システム設定</h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded">📊</span> Google Spreadsheet 連携
          </h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">スプレッドシートID</label>
              <input type="text" className="w-full mt-1 p-2 border border-slate-300 rounded bg-slate-50" placeholder="1a2b3c4d5e6f7g..." readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">シート名</label>
              <input type="text" className="w-full mt-1 p-2 border border-slate-300 rounded bg-slate-50" placeholder="投稿管理リスト" readOnly />
            </div>
            <button className="w-fit px-4 py-2 bg-slate-800 text-white rounded text-sm hover:bg-slate-900 transition">
              Google連携を認証する
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded">🐦</span> X (Twitter) API 設定
          </h3>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4 text-sm text-amber-800">
            <strong>注意：</strong> X API (Free Tier) は月間50投稿までの制限があります。制限を超えた場合は「手動投稿」モードへ自動的に切り替わります。
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">アカウントハンドル</label>
              <input type="text" className="w-full mt-1 p-2 border border-slate-300 rounded bg-slate-50" placeholder="@museum_official" readOnly />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="auto-post" className="w-4 h-4 text-indigo-600" checked={false} readOnly />
              <label htmlFor="auto-post" className="text-sm text-slate-700 font-medium">承認後、直ちに自動投稿を試行する</label>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition">
            設定を保存
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
