// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PI_API = "https://api.minepi.com/v2";
const SERVER_KEY = process.env.PI_API_KEY; // Render env var

// Approve
app.post("/api/approve", async (req, res) => {
  try {
    const { paymentId } = req.body;
    const r = await fetch(`${PI_API}/payments/${paymentId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Key ${SERVER_KEY}` }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Complete
app.post("/api/complete", async (req, res) => {
  try {
    const { paymentId, txid } = req.body;
    const r = await fetch(`${PI_API}/payments/${paymentId}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Key ${SERVER_KEY}` },
      body: JSON.stringify({ txid })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Cancel  ✅ यही अभी चाहिए
app.post("/api/cancel", async (req, res) => {
  try {
    const { paymentId } = req.body;
    const r = await fetch(`${PI_API}/payments/${paymentId}/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Key ${SERVER_KEY}` }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/", (_, res) => res.send("RC backend OK"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server on", port));