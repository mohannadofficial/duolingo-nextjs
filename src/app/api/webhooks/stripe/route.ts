import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Create Subscription for the first time
  if (event.type === "checkout.session.completed") {
    const susbscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    await db.insert(userSubscription).values({
      userId: session.metadata.userId,
      stripeSubscriptionId: susbscription.id,
      stripeCustomerId: susbscription.customer as string,
      stripePriceId: susbscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(susbscription.current_period_end * 1000),
    });
  }

  // Renew his own Subscription
  if (event.type === "invoice.payment_succeeded") {
    const susbscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await db
      .update(userSubscription)
      .set({
        stripePriceId: susbscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          susbscription.current_period_end * 1000, // Convert to ms
        ),
      })
      .where(eq(userSubscription.stripeSubscriptionId, susbscription.id));
  }

  return new NextResponse(null, { status: 200 });
}
