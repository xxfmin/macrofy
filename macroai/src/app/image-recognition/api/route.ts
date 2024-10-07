import { NextResponse } from "next/server";
import OpenAI from "openai";
import { jsonrepair } from "jsonrepair";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// TypeScript interfaces
interface Macros {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

interface ResponseData {
  ingredients: string[];
  quantities: string[];
  macros: {
    [ingredient: string]: Macros;
  };
  total_macros: Macros;
}

export async function POST(req: Request) {
  try {
    const { image_url } = await req.json();
    const prompt = `
      Imagine you are a tool used to analyze the contents of a dish based on a provided image. Your task is to identify the ingredients, approximate quantities, and provide the respective macros for each ingredient. Then, calculate and display the total calories and macros. If the image doesn't depict food, state "This is not food" without further explanation.

      The output should be in valid JSON format as follows:
      {
        "ingredients": ["ingredient1", "ingredient2", ...],
        "quantities": ["quantity1", "quantity2", ...],
        "macros": {
          "ingredient1": {"protein": X, "fat": X, "carbs": X, "calories": X},
          "ingredient2": {"protein": X, "fat": X, "carbs": X, "calories": X},
          ...
        },
        "total_macros": {"protein": X, "fat": X, "carbs": X, "calories": X}
      }

      Note: Replace X with numerical values, and ensure the JSON is properly formatted. Do not include any extra text or explanations. Only output the JSON data.

      Image URL: ${image_url}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const messageContent = response.choices[0]?.message?.content;

    if (!messageContent) {
      return NextResponse.json(
        { error: "No response received from OpenAI" },
        { status: 500 }
      );
    }

    const assistantMessage = messageContent.trim();

    if (assistantMessage === "This is not food") {
      return NextResponse.json({ error: "This is not food" }, { status: 400 });
    }

    let data: ResponseData;
    try {
      data = JSON.parse(assistantMessage);
    } catch (parseError) {
      try {
        const repairedJSON = jsonrepair(assistantMessage);
        data = JSON.parse(repairedJSON);
      } catch (repairError) {
        console.error("JSON repair error:", repairError);
        return NextResponse.json(
          { error: "Failed to parse response from OpenAI" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in API route:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
