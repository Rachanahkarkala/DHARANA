
const path = require("path");
const express = require("express");
const { Pool } = require("pg");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: true }
      : false,
});

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const choices = new Set([
  "Coworking",
  "Study Space",
  "Private Office",
  "Meeting Room",
  "Training / Event",
  "Partnership",
  "General Enquiry",
]);

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    console.error("Health check failed:", err.message);
    res.status(503).json({ error: "Database unavailable" });
  }
});

app.post("/api/enquiry", async (req, res) => {
  const { name, email, phone, looking, message } = req.body || {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.trim().length > 100
  ) {
    return res.status(400).json({
      error: "Please enter your name.",
    });
  }

  if (
    typeof email !== "string" ||
    !email.trim() ||
    email.trim().length > 200 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return res.status(400).json({
      error: "Please enter a valid email.",
    });
  }

  if (
    typeof phone !== "string" ||
    !phone.trim() ||
    phone.trim().length > 30
  ) {
    return res.status(400).json({
      error: "Please enter your phone number.",
    });
  }

  if (typeof looking !== "string" || !choices.has(looking)) {
    return res.status(400).json({
      error: "Please select what you are looking for.",
    });
  }

  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.trim().length > 2000
  ) {
    return res.status(400).json({
      error: "Please add a message.",
    });
  }

  const enquiry = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    looking,
    message: message.trim(),
  };

  try {
    // 1. Save the enquiry to Neon first.
    await pool.query(
      `INSERT INTO enquiries
        (name, email, phone, looking_for, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        enquiry.name,
        enquiry.email,
        enquiry.phone,
        enquiry.looking,
        enquiry.message,
      ]
    );
  } catch (err) {
    console.error("Enquiry save failed:", err.message);

    return res.status(500).json({
      error: "Unable to submit your enquiry right now.",
    });
  }

  // 2. Email the enquiry to the designated inbox.
  if (!resend) {
    console.error(
      "Enquiry saved, but email was not sent: RESEND_API_KEY is missing."
    );

    return res.status(201).json({
      ok: true,
      emailSent: false,
      message: "Enquiry saved. Email notification is not configured yet.",
    });
  }

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: ["hrversuance@gmail.com"],
      replyTo: enquiry.email,
      subject: `New Dharana Spaces enquiry: ${enquiry.looking}`,
      text: [
        "You have received a new enquiry through the Dharana Spaces website.",
        "",
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone}`,
        `Enquiry type: ${enquiry.looking}`,
        "",
        "Message:",
        enquiry.message,
      ].join("\n"),
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log("Enquiry email sent:", result.data?.id);

    return res.status(201).json({
      ok: true,
      emailSent: true,
    });
  } catch (err) {
    // Keep the database record even if the email provider fails.
    console.error(
      "Enquiry saved, but notification email failed:",
      err.message
    );

    return res.status(201).json({
      ok: true,
      emailSent: false,
      message: "Enquiry saved, but the email notification failed.",
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Dharana API running on port ${port}`);
});
