import express from "express";
import Flutterwave from "flutterwave-node-v3";
import { protect } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

router.post("/", protect, async (req, res) => {
  const { business_name, bank_code, account_number, split_ratio } = req.body;
  try {
    const response = await flw.Subaccount.create({
      account_bank: bank_code,
      account_number,
      business_name,
      business_email: req.user.email,
      split_type: "percentage",
      split_value: split_ratio || 85
    });
    if (response.status !== "success") throw new Error("Subaccount creation failed");
    req.user.merchant = { isMerchant: true, businessName: business_name, subAccountId: response.data.id };
    await req.user.save();
    res.json({ subAccountId: response.data.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
