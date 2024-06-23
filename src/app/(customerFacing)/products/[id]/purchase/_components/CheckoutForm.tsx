"use client";
import { currencyFormatter } from "@/lib/formatter";
import Image from "next/image";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Form from "./Form";

type CheckoutFormProps = {
  product: {
    id: string;
    imagepath: string;
    name: string;
    priceInPkr: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagepath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">{currencyFormatter(product.priceInPkr)}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form productId={product.id} priceInPkr={product.priceInPkr} />
      </Elements>
    </div>
  );
};

export default CheckoutForm;
