import { sanitizeLeadPayload, validateLeadPayload } from "@/lib/validations/lead";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const payload = sanitizeLeadPayload(rawBody);
    const errors = validateLeadPayload(payload);

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const normalizedService = payload.serviceInterested.toLowerCase();
    const serviceTag = normalizedService.includes("recovery")
      ? "recovery"
      : normalizedService.includes("partnership")
        ? "sales-partnership"
        : normalizedService.includes("growth")
          ? "growth"
          : "outreach";

    const leadRecord = {
      ...payload,
      source: payload.source || "unknown-source",
      pagePath: payload.pagePath || "",
      tags: ["demo-lead", serviceTag],
      createdAt: new Date().toISOString(),
    };

    if (process.env.LEAD_WEBHOOK_URL) {
      const webhookResponse = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadRecord),
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          { ok: false, errors: ["Lead webhook rejected the request. Please try again."] },
          { status: 502 },
        );
      }
    } else {
      console.log("[lead]", leadRecord);
    }

    return NextResponse.json({ ok: true, message: "Lead submitted successfully." }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Something went wrong. Please try again."] },
      { status: 500 },
    );
  }
}
