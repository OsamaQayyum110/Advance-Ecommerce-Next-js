import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
//import PurchaseReceiptEmail from "@/email/PurchaseReceipt"; // Ensure this is correctly imported

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  let event;

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log("event====>", JSON.stringify(event, null, 2));
  } catch (err) {
    console.error(`Error verifying webhook signature: ${err}`);
    return new NextResponse("Webhook Error: Unable to verify signature", {
      status: 400,
    });
  }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidAtPkr = charge.amount;

    if (!productId || !email) {
      return new NextResponse("Bad Request: Missing product ID or email", {
        status: 400,
      });
    }

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) {
      return new NextResponse("Bad Request: Product not found", {
        status: 400,
      });
    }

    const userFields = {
      email,
      orders: { create: { productId, pricePaidAtPkr } },
    };
    const {
      orders: [order],
    } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    try {

      await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Order Confirmation",
        react:<h1>Hello</h1>,
      });
    } catch (error) {
      console.error(`Error sending confirmation email: ${error}`);
    }
  }

  return new NextResponse("Webhook received successfully", { status: 200 });
}
