// 경량 구조화 로거 — Vercel 로그에 자동 수집됨.
// SLACK_ERROR_WEBHOOK 환경변수 설정 시 CRITICAL 에러를 Slack으로도 전송.

type LogLevel = "info" | "warn" | "error" | "critical";

interface LogPayload {
  level: LogLevel;
  source: string;
  message: string;
  errorId: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

function makeErrorId(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function buildPayload(
  level: LogLevel,
  source: string,
  err: unknown,
  details?: Record<string, unknown>
): LogPayload {
  const message =
    err instanceof Error
      ? err.message
      : typeof err === "string"
      ? err
      : "Unknown error";

  return {
    level,
    source,
    message,
    errorId: makeErrorId(),
    timestamp: new Date().toISOString(),
    details: {
      ...(err instanceof Error && err.stack ? { stack: err.stack.split("\n").slice(0, 5).join(" | ") } : {}),
      ...details,
    },
  };
}

async function sendSlackAlert(payload: LogPayload) {
  const webhook = process.env.SLACK_ERROR_WEBHOOK;
  if (!webhook) return;

  const emoji = payload.level === "critical" ? "🔴" : "🟠";
  const text = `${emoji} *[${payload.level.toUpperCase()}]* \`${payload.source}\` — ${payload.message}\n\`errorId: ${payload.errorId}\` | ${payload.timestamp}`;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch {
    // Slack 실패해도 앱 영향 없음
  }
}

export function logInfo(source: string, message: string, details?: Record<string, unknown>) {
  const payload = buildPayload("info", source, message, details);
  console.log(JSON.stringify(payload));
}

export function logWarn(source: string, err: unknown, details?: Record<string, unknown>) {
  const payload = buildPayload("warn", source, err, details);
  console.warn(JSON.stringify(payload));
}

export function logError(source: string, err: unknown, details?: Record<string, unknown>) {
  const payload = buildPayload("error", source, err, details);
  console.error(JSON.stringify(payload));
  // error 레벨은 Slack으로도 전송
  sendSlackAlert(payload).catch(() => {});
  return payload.errorId;
}

export function logCritical(source: string, err: unknown, details?: Record<string, unknown>) {
  const payload = buildPayload("critical", source, err, details);
  console.error(JSON.stringify(payload));
  sendSlackAlert(payload).catch(() => {});
  return payload.errorId;
}
