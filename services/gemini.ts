
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GenerationResult {
  title: string;
  body: string;
  angle: string; // 投稿の切り口（例：イベント紹介、裏話、豆知識など）
}

export const generateXPost = async (input: string, inputType: 'TEXT' | 'URL' | 'FILE'): Promise<GenerationResult[]> => {
  const model = 'gemini-3-flash-preview';

  const systemInstruction = `
    あなたは公共文化施設（博物館・美術館）の広報担当者です。
    提供された情報を元に、X（旧Twitter）向けの投稿案を【必ず10個】、異なる視点や切り口で作成してください。
    
    【生成バリエーションの必須項目（以下の視点をバランスよく配置）】
    1. 【見どころ】展示のメインビジュアルや目玉の紹介
    2. 【背景/歴史】展示品にまつわる深い歴史やストーリー
    3. 【職員の目】準備中のエピソードや職員だけが知る魅力
    4. 【来館案内】アクセス、チケット情報、現在の混雑状況（想定）
    5. 【クイズ/豆知識】フォロワーの興味を引く問いかけ
    6. 【お子様向け】家族連れにアピールする内容
    7. 【フォトスポット】SNS映えする場所の紹介
    8. 【ショップ/カフェ】併設施設やグッズの紹介
    9. 【期間限定】「いまだけ」を強調した告知
    10. 【情緒】展示空間の雰囲気や、静かな鑑賞のすすめ
    
    【制約事項】
    - タイトル: 15文字以内。
    - 本文: 150文字以内。ハッシュタグ2つ以内。正確かつ誠実なトーン。
    - 安全性: 未公開情報や個人情報は除外。
  `;

  const prompt = `以下のデータを元に、指示に従って10個の投稿案を作成してください。\n内容: ${input}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "投稿のタイトル" },
              body: { type: Type.STRING, description: "150文字以内の本文" },
              angle: { type: Type.STRING, description: "この案の切り口（例：豆知識）" }
            },
            required: ["title", "body", "angle"]
          }
        }
      }
    });

    const results = JSON.parse(response.text);
    return results as GenerationResult[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("生成に失敗しました。時間をおいて再度お試しください。");
  }
};
