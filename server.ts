import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";
import crypto from "crypto";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "sapient-day-fcf5x",
  });
}
const db = admin.firestore();

// Set database ID if provided
const firestoreDatabaseId = "ai-studio-e3b05991-d47e-41b0-9dd9-ec8b9371e130";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Razorpay Initialization
  let razorpay: any = null;
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } else {
    console.warn("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET missing. Payment features will be simulated.");
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Create Razorpay Order
  app.post("/api/create-order", async (req, res) => {
    const { amount, currency = "INR" } = req.body;

    if (!razorpay) {
      // Simulation mode
      return res.json({
        id: "order_sim_" + Math.random().toString(36).substr(2, 9),
        amount: amount * 100,
        currency,
        key: "rzp_test_simulation",
        simulated: true
      });
    }

    try {
      const options = {
        amount: Math.round(amount * 100), // Razorpay expects paise
        currency,
        receipt: "order_rcptid_" + Date.now(),
      };

      const order = await razorpay.orders.create(options);
      res.json({
        ...order,
        key: process.env.RAZORPAY_KEY_ID
      });
    } catch (error) {
      console.error("Razorpay Order Creation Error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Verify Payment & Save Order
  app.post("/api/verify-payment", async (req, res) => {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderData 
    } = req.body;

    let isVerified = false;

    if (razorpay) {
      const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generated_signature = hmac.digest("hex");
      isVerified = generated_signature === razorpay_signature;
    } else {
      // Simulation mode
      isVerified = razorpay_order_id.startsWith("order_sim_");
    }

    if (!isVerified) {
      return res.status(400).json({ status: "failed", message: "Invalid signature" });
    }

    try {
      // Save to Firestore
      const orderRef = db.collection(`orders`).doc();
      const orderToSave = {
        ...orderData,
        orderId: `KD-${Math.floor(100000 + Math.random() * 900000)}`,
        payment: {
          ...orderData.payment,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "paid"
        },
        orderStatus: "paid",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await orderRef.set(orderToSave);

      res.json({ 
        status: "success", 
        orderId: orderToSave.orderId,
        firestoreId: orderRef.id
      });
    } catch (error) {
      console.error("Firestore Save Error:", error);
      res.status(500).json({ error: "Failed to save order" });
    }
  });

  // Client-side serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
