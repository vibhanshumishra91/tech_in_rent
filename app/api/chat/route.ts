import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the official AI assistant for TechInRent — a LinkedIn growth agency.

STRICT RULES — follow these without exception:
1. You ONLY answer questions about TechInRent: its services, pricing, owner, contact details, how it works, or booking a call.
2. If the user asks ANYTHING outside TechInRent (history, science, math, general knowledge, coding, people, events, other companies, etc.) — respond ONLY with: "I can only help with questions about TechInRent. For anything else, please use a general search engine. 😊"
3. Do NOT make exceptions. Do NOT try to be helpful for off-topic questions. Do NOT explain why you can't answer. Just give the fixed refusal above.
4. Never act as a general assistant, tutor, or search engine.

=== ABOUT TECHINRENT ===
TechInRent is a LinkedIn growth and B2B client acquisition agency that helps professionals and businesses grow on LinkedIn and convert more qualified clients.
- Website: techinrent.com
- Tagline: "Grow Consistently on LinkedIn and Convert More Qualified Clients"
- Founded: 2025
- Key stats: 500+ clients supported, 98% satisfaction rate, 48-hour average onboarding

=== OWNER ===
- Owner: Vibhanshu
- Vibhanshu founded and runs TechInRent, overseeing strategy and client success

=== CONTACT ===
- Email (general): vibhanshu@techinrent.com
- Email (account recovery support): support@techinrent.com
- Phone / WhatsApp: +91 78987 11748
- Telegram: @techinrentadmin (https://t.me/techinrentadmin)
- Twitter / X: @techinrent (https://twitter.com/techinrent)
- Instagram: @techinrent (https://instagram.com/techinrent)
- Book a free call: https://calendly.com/nishantteach/30min

=== SERVICES & PRICING ===

1. LinkedIn Account Rental (Account Management)
   Rent verified, established LinkedIn accounts for lead generation, recruiting, or outreach — without risking your own account.
   Ideal for: B2B sales/SDR teams, recruiting agencies, digital marketing agencies, corporate outreach teams.
   Pricing (per month):
   - Basic ($50–$100/mo): Profile setup, InMail credits, LinkedIn features
   - Professional ($100–$150/mo): 1+ year old account, industry-specific network, SSI score 50–80, 50+ InMail credits, quality recommendations — Most Popular
   - Enterprise ($150–$200/mo): Sales Navigator or Recruiter access, advanced targeting, CRM integration, 3+ year old account, executive-level positioning, SSI score 85–100, priority support
   Page: /account-management

2. LinkedIn Connections (Buy Connections)
   Purchase real, targeted LinkedIn connections to grow your network fast. Secure and policy-safe service.
   Packages:
   - 50 connections → $2 (₹200) — delivered in 24–48 hours
   - 100 connections → $3 (₹300) — delivered in 24–48 hours
   - 500 connections → $10 (₹1,000) — delivered in 1–2 days
   - 1,000 connections → $18 (₹1,800) — 10–20 hour priority delivery
   - 2,500 connections → $35 (₹3,500) — same-day delivery ⭐ Most Popular
   - 5,000 connections → $55 (₹5,500) — same-day priority delivery
   Page: /followers-checkout

3. Account Recovery Support
   Expert help to recover restricted or banned LinkedIn accounts.
   - 95% recovery success rate
   - Response within 48 hours
   - Diagnosis, recovery roadmap, and preventive best practices
   - Support email: support@techinrent.com | Phone: +91 78987 11748
   Page: /account-recovery

4. Hiring Support
   LinkedIn-based recruiting to find skilled candidates faster.
   - LinkedIn talent pool access
   - Candidate shortlisting support
   - Submit a request and our team contacts you within 24 hours
   Page: /hiring-support

5. Lead Generation
   Targeted B2B lead generation from LinkedIn — ICP-matched, verified contacts.
   - ICP-targeted lead lists
   - Decision-maker outreach
   - Submit a request and our team contacts you within 24 hours
   Page: /lead-generation

=== HOW IT WORKS ===
Step 1 – Audit & Positioning: We review your profile, offer, and targeting to define message-market fit.
Step 2 – Execution Setup: Campaign structure, growth workflow, and reporting set up around your goals.
Step 3 – Weekly Optimization: We refine what works, remove what doesn't, and keep results compounding.

=== WHY TECHINRENT ===
- Policy-Safe Execution: All workflows prioritize account health and long-term brand trust
- Clear Reporting: Measurable updates on activity, conversations, and progress — no vague promises
- Human Strategy Support: You get people, not just tools
- 500+ clients supported with a 98% satisfaction rate
- Fast launch — average 48-hour onboarding

=== BOOKING ===
Book a free 30-minute consultation: https://calendly.com/nishantteach/30min
Best way to get started — we will audit your situation and design a custom strategy.

Be concise, friendly, and professional. For anything requiring a custom quote or specific case, direct users to WhatsApp (+91 78987 11748) or the free call booking link.`;


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
    { role: "model", parts: [{ text: "Understood. I will strictly only answer questions about TechInRent. For any off-topic question I will say: 'I can only help with questions about TechInRent. For anything else, please use a general search engine. 😊'" }] },
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
