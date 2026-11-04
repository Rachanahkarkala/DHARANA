
const ALLOWED_ORIGINS = new Set([
  "https://dharana-spaces.pages.dev",
  "https://dharana.space",
  "https://www.dharana.space",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const CHOICES = new Set([
  "Coworking",
  "Study Space",
  "Private Office",
  "Meeting Room",
  "Training / Event",
  "Partnership",
  "General Enquiry",
]);

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      if (origin && !ALLOWED_ORIGINS.has(origin)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers });
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Origin not allowed" }, 403);
    }

    if (url.pathname === "/api/health" && request.method === "GET") {
      let client;

      try {
        const { Client } = await import("pg");
        client = new Client({
          connectionString: env.HYPERDRIVE.connectionString,
        });

        await client.connect();
        await client.query("SELECT 1");
        return json({ status: "ok", database: "connected" }, 200, headers);
      } catch (error) {
        console.error("Health check failed:", error);
        return json({ error: "Database connection failed" }, 500, headers);
      } finally {
        if (client) {
          await client.end().catch(() => {});
        }
      }
    }

    if (url.pathname !== "/api/enquiry" || request.method !== "POST") {
      return json({ error: "Not found" }, 404, headers);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, headers);
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const lookingFor =
      typeof body.looking_for === "string" ? body.looking_for.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (
      !name ||
      !email ||
      !phone ||
      !CHOICES.has(lookingFor) ||
      !message ||
      name.length > 150 ||
      email.length > 254 ||
      phone.length > 40 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return json({ error: "Please check your enquiry details." }, 400, headers);
    }

    let client;

    try {
      const { Client } = await import("pg");

      client = new Client({
        connectionString: env.HYPERDRIVE.connectionString,
      });

      await client.connect();

      await client.query(
        `INSERT INTO public.enquiries
          (name, email, phone, looking_for, message)
         VALUES ($1, $2, $3, $4, $5)`,
        [name, email, phone, lookingFor, message]
      );

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Dharana Spaces <enquiries@dharana.space>",
          to: ["hrversuance@gmail.com"],
          reply_to: email,
          subject: `New Dharana Spaces enquiry: ${lookingFor}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Looking for: ${lookingFor}`,
            "",
            "Message:",
            message,
          ].join("\n"),
        }),
      });

      if (!emailResponse.ok) {
        console.error("Resend returned status:", emailResponse.status);
        return json({
          success: true,
          message: "Your enquiry was saved, but email notification failed.",
        }, 201, headers);
      }

      return json({
        success: true,
        message: "Your enquiry has been submitted successfully.",
      }, 201, headers);
    } catch (error) {
      console.error("Enquiry processing failed:", error);
      return json({ error: "Unable to submit your enquiry right now." }, 500, headers);
    } finally {
      if (client) {
        await client.end().catch(() => {});
      }
    }
  },
};
