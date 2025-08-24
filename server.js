import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["https://routecanal.onrender.com"] })); // static site origin

const PI_API = "https://api.minepi.com/v2";
const KEY = process.env.PI_API_KEY; // Render env var (Server API Key sk_...)

const headers = () => ({ "Authorization": `Key ${KEY}`, "Content-Type": "application/json" });

app.get("/", (_req, res) => res.send("RouteCanal backend OK"));

app.post("/api/approve", async (req, res) => {
  try {
    const { paymentId } = req.body;
    const r = await fetch(`${PI_API}/payments/${paymentId}/approve`, { method: "POST", headers: headers() });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/complete", async (req, res) => {
  try {
    const { paymentId, txid } = req.body;
    const r = await fetch(`${PI_API}/payments/${paymentId}/complete`, {
      method: "POST", headers: headers(), body: JSON.stringify({ txid })
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/cancel", async (req, res) => {
  try {
    const { paymentId } = req.body;
    const r = await fetch(`${PI_API}/payments/${paymentId}/cancel`, { method: "POST", headers: headers() });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(process.env.PORT || 3000);