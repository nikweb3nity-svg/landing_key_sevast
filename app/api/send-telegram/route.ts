import { NextResponse } from "next/server";
import { formatTelegramLeadMessage, normalizeTelegramLead } from "@/lib/telegram";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректные данные формы." }, { status: 400 });
  }

  const lead = normalizeTelegramLead(payload);

  if (!lead) {
    return NextResponse.json({ error: "Укажите имя и телефон." }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Telegram не настроен на сервере." }, { status: 500 });
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramLeadMessage(lead),
    }),
  });

  if (!telegramResponse.ok) {
    const details = await telegramResponse.text();
    console.error("Telegram sendMessage failed:", details);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Позвоните нам напрямую." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
