import express from "express";
import Flutterwave from "flutterwave-node-v3";
import { protect } from "../middleware/auth.js";
import crypto from "crypto";

const router = express.Router();
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const signature = req.headers["verif-hash"];
  if (!signature || signature !== process.env.FLW_HASH) return res.sendStatus(401);
  const payload = JSON.parse(req.body.toString());
  // Verify transaction
  const { data } = await flw.Transaction.verify({ id: payload.data.id });
  if (data.status === "successful") {
     console.log("Payment verified: ", data.tx_ref);
  }
  res.sendStatus(200);
});

export default router;
