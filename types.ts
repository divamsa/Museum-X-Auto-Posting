
/**
 * 投稿データのステータス管理
 */
export enum PostStatus {
  DRAFT = 'DRAFT',           // 生成直後
  SYNCED = 'SYNCED',         // Spreadsheetへ同期済み
  APPROVED = 'APPROVED',     // ユーザー確認・修正済み
  POSTED = 'POSTED',         // Xへ投稿完了
  FAILED = 'FAILED',         // 投稿失敗
  MANUAL = 'MANUAL'          // 手動投稿用に確定
}

/**
 * 入力ソースの種別
 */
export enum SourceType {
  TEXT = 'TEXT',
  URL = 'URL',
  FILE = 'FILE'
}

/**
 * メインの投稿データスキーマ
 */
export interface PostData {
  id: string;
  createdAt: string;
  sourceType: SourceType;
  sourceContent: string;     // 元テキスト、URL、またはファイル名
  generatedTitle: string;    // 生成されたタイトル
  generatedBody: string;     // 生成された本文（150字以内）
  editedBody?: string;       // ユーザーによる修正後の本文
  status: PostStatus;
  spreadsheetRow?: number;   // 連携先スプレッドシートの行番号
  postUrl?: string;          // 投稿成功時のURL
  errorMessage?: string;     // エラー発生時のログ
}

/**
 * 監査ログ用スキーマ
 */
export interface AuditLog {
  timestamp: string;
  userId: string;
  action: string;
  details: string;
}

/**
 * アプリ設定
 */
export interface AppSettings {
  spreadsheetId: string;
  sheetName: string;
  xAccountHandle: string;
  isAutoPostEnabled: boolean;
}
