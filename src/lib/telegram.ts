export interface TelegramLead {
  name: string;
  phone: string;
  comment: string;
  consent: true;
}

export function normalizeTelegramLead(input: unknown): TelegramLead | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const data = input as Record<string, unknown>;
  const name = normalizeField(data.name);
  const phone = normalizeField(data.phone);
  const comment = normalizeField(data.comment) || "Без комментария";
  const consent = data.consent === true;

  if (!name || !phone || !consent) {
    return null;
  }

  return {
    name,
    phone,
    comment,
    consent,
  };
}

export function formatTelegramLeadMessage(lead: TelegramLead, now = new Date()) {
  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(now);

  return [
    "🔔 Новая заявка",
    "",
    `👤 Имя: ${lead.name}`,
    `📞 Телефон: ${lead.phone}`,
    `💬 Комментарий: ${lead.comment}`,
    "",
    `⏰ Время: ${time} МСК`,
  ].join("\n");
}

function normalizeField(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, 1000);
}
