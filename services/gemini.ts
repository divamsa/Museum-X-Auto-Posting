import { GoogleGenAI, Type } from "@google/genai";

// process.envが未定義でもエラーにならないように保護
const API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : "";

export interface GenerationResult {
  title: string;
  body: string;
  angle: string;
}

export const generateXPost = async (input: string, inputType: 'TEXT' | 'URL' | 'FILE'): Promise<GenerationResult[]> => {
  // 実行直前にインスタンスを生成することで最新のキーを使用
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = 'gemini-3-flash-preview';

  const systemInstruction = `
    あなたは公共文化施設（博物館・美術館）の広報担当者です。
    提供された情報を元に、X（Twitter）向けの投稿案を【必ず10個】、異なる視点や切り口で作成してください。
    
    【生成する10個の役割】
    1. 【見どころ】作品の魅力
    2. 【裏話】準備エピソード
    3. 【豆知識】歴史背景
    4. 【案内】開館情報
    5. 【クイズ】問いかけ
    6. 【お子様】やさしい解説
    7. 【写真】映えスポット
    8. 【ショップ】グッズ紹介
    9. 【期間限定】終了間際告知
    10.【情緒】館の雰囲気
    
    【制約】
    - 本文は150文字以内。
    - 返信は必ず指定されたJSON形式の配列のみ。
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
    throw new Error("生成に失敗しました。APIキーまたはネットワークを確認してください。");
  }
};