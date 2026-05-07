import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey || apiKey === "your-api-key-here") {
    return NextResponse.json({ error: "AI_API_KEY not set" }, { status: 500 });
  }

  const res = await fetch(`${baseUrl}/models?key=${apiKey}`);
  const data = await res.json();

  const models = (data.models ?? []).map((m: { name: string; supportedGenerationMethods?: string[] }) => ({
    name: m.name,
    methods: m.supportedGenerationMethods,
  }));

  return NextResponse.json({ models });
}
