import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const product = await db.product.findUnique({ where: { id } });

    if (product == null) return notFound();

  const exchangeRatePkrToUsd = 0.0036; // Example exchange rate, replace with the current rate

  const productAmountInPkr = product?.priceInPkr as number;

  // Convert PKR to USD cents
  const productAmountInUsdCents = Math.round(
    productAmountInPkr * exchangeRatePkrToUsd *100
  );

  const minimumAmountInUsdCents = 50; // Stripe's minimum charge amount in USD cents

  if (productAmountInUsdCents < minimumAmountInUsdCents) {
    throw new Error(
      `The minimum amount to charge in USD is ${
        minimumAmountInUsdCents / 100
      } USD. Your current product price in PKR is too low.`
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: productAmountInUsdCents,
    currency: "USD",
    metadata: { productId: product?.id as string },
  });

    if (paymentIntent.client_secret == null) {
        throw Error("Stripe failed to create payment intent");
    }

    return (
      <CheckoutForm
        product={product}
        clientSecret={paymentIntent.client_secret}
      />
    );
}
