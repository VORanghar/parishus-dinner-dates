import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { eventId, billingInfo, quantity = 1 } = await req.json();

    // Get event details
    const { data: event, error: eventError } = await supabaseClient
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      throw new Error('Event not found');
    }

    // Check if event has available seats
    if (event.current_attendees + quantity > event.max_attendees) {
      throw new Error('Not enough seats available');
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const totalAmount = event.price * quantity;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      metadata: {
        event_id: eventId,
        event_name: event.name,
        quantity: quantity.toString(),
        user_email: billingInfo.email,
      },
    });

    // Store payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        stripe_payment_intent_id: paymentIntent.id,
        user_email: billingInfo.email,
        full_name: billingInfo.fullName,
        billing_address: {
          address: billingInfo.address,
          city: billingInfo.city,
          country: billingInfo.country,
          zipCode: billingInfo.zipCode,
        },
        amount: totalAmount,
        status: 'pending',
      })
      .select()
      .single();

    if (paymentError) {
      throw new Error('Failed to create payment record');
    }

    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
      eventName: event.name,
      totalAmount: totalAmount
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Payment creation failed' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});