export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.formData();
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  // Honeypot — bots fill this hidden field
  if (data.get("website")) {
    return new Response("ok", { status: 200 });
  }

  // Required fields
  const name = data.get("name")?.trim();
  const contact =
    data.get("phone")?.trim() ||
    data.get("email")?.trim() ||
    data.get("contact")?.trim();

  if (!name || !contact) {
    return json({ ok: false, error: "Missing required fields" }, 422);
  }

  // Build email body
  const fields = Object.fromEntries(data.entries());
  delete fields.website; // remove honeypot
  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  // Send via Resend
  const mailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.LEAD_FROM_EMAIL || "Port Credit Cleaning <leads@mustbethebeard.com>",
      to: [env.LEAD_EMAIL || "hello@portcreditcleaning.ca"],
      reply_to: fields.email || undefined,
      subject: `New lead from ${name}`,
      text: body,
    }),
  });

  if (!mailRes.ok) {
    const err = await mailRes.text();
    console.error("Resend error:", err);
    // Still return success to user — don't block on email failure
  }

  // Native POST fallback: redirect
  const accept = request.headers.get("Accept") || "";
  if (!accept.includes("application/json")) {
    return Response.redirect("/?submitted=1#quote", 303);
  }

  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
