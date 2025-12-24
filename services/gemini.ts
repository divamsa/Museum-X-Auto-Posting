
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GenerationResult {
  title: string;
  body: string;
  angle: string;
}

export const generateXPost = async (input: string, inputType: 'TEXT' | 'URL' | 'FILE'): Promise<GenerationResult[]> => {
  const model = 'gemini-3-flash-preview';

  const systemInstruction = `
    あなたは公共文化施設（博物館・美術館）の広報担当者です。
    提供された情報を元に、X（Twitter）向けの投稿案を【必ず10個】、異なる視点や切り口で作成してください。
    
    【生成する10個の役割】
    1. 【見どころ】目玉作品の紹介
    2. 【裏話】準備中のエピソードや職員の感想
    3. 【豆知識】展示品に関連する短い歴史知識
    4. 【案内】開館時間、アクセス、混雑情報
    5. 【クイズ】読者に問いかける形式
    6. 【お子様】家族連れに向けたやさしい言葉遣い
    7. 【写真】フォトスポットの紹介
    8. 【ショップ】図録や関連グッズの紹介
    9. 【期間限定】終了間際の告知や今だけの見どころ
    10.【情緒】館内の雰囲気や静かな空間の魅力
    
    【制約事項】
    - タイトル: 15文字以内。
    - 本文: 150文字以内。ハッシュタグは1〜2個。
    - トーン: 誠実、知的、親しみやすい。
  `;

  const prompt = `以下の内容を分析し、10個のバリエーションを作成してください。\n内容: ${input}`;

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
              title: { type: Type.STRING },
              body: { type: Type.STRING },
              angle: { type: Type.STRING }
            },
            required: ["title", "body", "angle"]
          }
        }
      }
    });

    return JSON.parse(response.text) as GenerationResult[];
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("生成に失敗しました。少し待ってから再度お試しください。");
  }
};
