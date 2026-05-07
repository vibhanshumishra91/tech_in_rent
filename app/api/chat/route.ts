import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a helpful assistant for TechInRent, a professional LinkedIn growth and client acquisition service. You ONLY answer questions about TechInRent and its services. If asked anything unrelated to TechInRent, politely say you can only help with TechInRent-related questions.

About TechInRent:
- Company: TechInRent — a LinkedIn growth and B2B client acquisition agency
- Core mission: Help professionals and businesses grow consistently on LinkedIn and convert more qualified clients

Services offered:
1. Account Management – Full LinkedIn profile management, content strategy, and engagement to grow your presence
2. LinkedIn Connection – Targeted connection campaigns to reach your ideal clients and decision-makers
3. Account Recovery – Recover restricted or banned LinkedIn accounts with expert support
4. Hiring Support – LinkedIn-based recruiting and talent sourcing for businesses
5. Lead Generation – Identify and deliver high-quality B2B leads from LinkedIn

How it works (process):
1. Book a free consultation call via Calendly
2. We audit your LinkedIn profile and define your target audience
3. We execute the strategy — outreach, content, connections
4. You receive qualified leads and booked meetings

Why choose TechInRent:
- Proven track record with real client results
- Dedicated account managers
- Transparent reporting and regular updates
- Tailored strategies — no one-size-fits-all
- Focused purely on LinkedIn (deep expertise)

Contact & booking:
- Book a call: https://calendly.com/nishantteach/30min
- WhatsApp available on the website
- Social: Instagram, Twitter/X, Telegram

Pricing: Contact us for a custom quote based on your goals and scope.

Keep your answers concise, friendly, and professional. If you don't know something specific, suggest they book a call or reach out via WhatsApp.`;

// Cache the resolved Gemini model name for the lifetime of the server process
let resolvedGeminiModel: string | null = null;

function parseErrorDetail(body: string): string {
  try {
    const parsed = JSON.parse(body);
    return parsed?.error?.message || parsed?.message || body.slice(0, 300);
  } catch {
    return body.slice(0, 300);
  }
}

// Fetch all models from the API and pick the best one that supports generateContent
async function discoverGeminiModel(baseUrl: string, apiKey: string, preferred: string): Promise<string> {
  if (resolvedGeminiModel) return resolvedGeminiModel;

  // Try the preferred model first
  const testRes = await fetch(`${baseUrl}/models/${preferred}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "hi" }] }] }),
  });

  if (testRes.ok || testRes.status !== 404) {
    resolvedGeminiModel = preferred;
    return preferred;
  }

  // Preferred model not available — list all models and pick the best one
  console.log(`Model "${preferred}" not found, discovering available models...`);
  const listRes = await fetch(`${baseUrl}/models?key=${apiKey}`);
  const listData = await listRes.json();

  type GeminiModel = { name: string; supportedGenerationMethods?: string[] };
  const all: GeminiModel[] = listData.models ?? [];

  const candidates = all
    .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
    .map((m) => m.name.replace("models/", ""));

  // Priority: flash > pro, newer version numbers first
  const priority = ["flash", "pro"];
  let picked = "";
  for (const keyword of priority) {
    const match = candidates.find((name) => name.includes(keyword));
    if (match) { picked = match; break; }
  }
  if (!picked) picked = candidates[0] ?? preferred;

  console.log(`Auto-selected Gemini model: ${picked}`);
  console.log(`All available models: ${candidates.join(", ")}`);
  resolvedGeminiModel = picked;
  return picked;
}

async function callGeminiNative(
  baseUrl: string,
  apiKey: string,
  preferredModel: string,
  messages: { role: string; content: string }[]
) {
  const model = await discoverGeminiModel(baseUrl, apiKey, preferredModel);
  const url = `${baseUrl}/models/${model}:generateContent?key=${apiKey}`;

  const contents = [
    { role: "user", parts: [{ text: `[Instructions] ${SYSTEM_PROMPT}` }] },
    { role: "model", parts: [{ text: "Understood. I will only answer questions about TechInRent." }] },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    }),
  });

  if (!response.ok) {
    // If the cached model is now stale, reset and let it rediscover next request
    if (response.status === 404) resolvedGeminiModel = null;
    const body = await response.text();
    console.error(`Gemini error [${response.status}] model=${model}:`, body);
    return { error: `Error ${response.status}: ${parseErrorDetail(body)}` };
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't get a response.";
  return { reply };
}

async function callOpenAICompatible(
  baseUrl: string,
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[]
) {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`AI provider error [${response.status}]:`, body);
    return { error: `Error ${response.status}: ${parseErrorDetail(body)}` };
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't get a response.";
  return { reply };
}

export async function POST(req: NextRequest) {
  const baseUrl = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;

  if (!baseUrl || !apiKey || !model || apiKey === "your-api-key-here") {
    return NextResponse.json(
      { reply: "⚠️ Chatbot not configured. Set AI_BASE_URL, AI_API_KEY, and AI_MODEL in .env.local and restart the server." },
      { status: 200 }
    );
  }

  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // If URL ends with /openai → use OpenAI-compatible format (works for Groq, OpenAI, and Gemini's OpenAI-compatible endpoint)
  // If URL is bare generativelanguage.googleapis.com (v1 or v1beta, no /openai) → use native Gemini API
  const isNativeGemini =
    baseUrl.includes("generativelanguage.googleapis.com") && !baseUrl.endsWith("/openai");

  const result = isNativeGemini
    ? await callGeminiNative(baseUrl, apiKey, model, messages)
    : await callOpenAICompatible(baseUrl, apiKey, model, messages);

  if (result.error) {
    return NextResponse.json({ reply: `❌ ${result.error}` }, { status: 200 });
  }

  return NextResponse.json({ reply: result.reply });
}
