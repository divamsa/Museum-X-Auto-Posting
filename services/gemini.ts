
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GenerationResult {
  title: string;
  body: string;
}

export const generateXPost = async (input: string, inputType: 'TEXT' | 'URL' | 'FILE'): Promise<GenerationResult[]> => {
  const model = 'gemini-3-flash-preview';

  const systemInstruction = `
    あなたは公共文化施設（博物館・美術館）の広報担当者です。
    提供された情報を元に、X（旧Twitter）向けの投稿案を【10個】作成してください。
    
    【生成のバリエーション指示】
    以下の異なる切り口を混ぜて10個作成してください：
    1. 展示の見どころ紹介
    2. 職員の裏話・準備風景
    3. 来館案内（アクセス・混雑状況想定）
    4. 展示物にまつわる豆知識・クイズ
    5. 期間限定イベントの告知
    
    【制約事項】
    - 1件あたりのタイトル: 内容を要約した短いタイトル（15文字以内）。
    - 1件あたりの本文: 親しみやすく、正確。文字数は必ず150文字以内に収めること。
    - ハッシュタグは各投稿に2つまで。
    - 安全性: 未公開情報や個人情報は除外すること。
    - トーン: 誠実、知的好奇心を刺激する、落ち着いたトーン。
  `;

  const prompt = `
    以下の${inputType === 'URL' ? 'URLの内容' : '提供データ'}を元に、投稿案を10個作成してください。
    内容: ${input}
  `;

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
              body: { type: Type.STRING, description: "150文字以内の投稿本文" }
            },
            required: ["title", "body"]
          }
        }
      }
    });

    const results = JSON.parse(response.text);
    return results as GenerationResult[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("投稿の生成に失敗しました。入力内容を確認してください。");
  }
};
