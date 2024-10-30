import prisma from "@/lib/db";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }
    event = stripe.webhooks.constructEvent(body, signature, secret!);
  } catch (err: unknown) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const customerEmail = event.data.object.customer_email;
      if (customerEmail) {
        await prisma.user.update({
          where: {
            email: customerEmail,
          },
          data: {
            hasAccess: true,
          },
        });
        return new Response("Updated user", { status: 200 });
      } else {
        return new Response("Customer email is null", { status: 400 });
      }
    default:
      return new Response("Unhandled event type", { status: 200 });
  }
};
