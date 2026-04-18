export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  monthlyBudget: string;
  serviceInterested: string;
  whatsappNumber: string;
  source?: string;
  pagePath?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\s0-9]{8,20}$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function sanitizeLeadPayload(input: unknown): LeadPayload {
  const record = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};

  return {
    name: clean(record.name),
    email: clean(record.email),
    company: clean(record.company),
    monthlyBudget: clean(record.monthlyBudget),
    serviceInterested: clean(record.serviceInterested),
    whatsappNumber: clean(record.whatsappNumber),
    source: clean(record.source),
    pagePath: clean(record.pagePath),
  };
}

export function validateLeadPayload(payload: LeadPayload): string[] {
  const errors: string[] = [];

  if (!payload.name || payload.name.length < 2) {
    errors.push("Please enter a valid name.");
  }

  if (!emailPattern.test(payload.email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!payload.company) {
    errors.push("Please enter your company name.");
  }

  if (!payload.monthlyBudget) {
    errors.push("Please enter your monthly budget.");
  }

  if (!payload.serviceInterested) {
    errors.push("Please choose a service.");
  }

  if (!phonePattern.test(payload.whatsappNumber)) {
    errors.push("Please enter a valid WhatsApp number.");
  }

  return errors;
}
