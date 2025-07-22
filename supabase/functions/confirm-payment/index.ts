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

    const { paymentIntentId, paymentId, eventId, quantity = 1 } = await req.json();

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment not confirmed');
    }

    // Update payment status
    const { error: paymentUpdateError } = await supabaseClient
      .from('payments')
      .update({ status: 'succeeded' })
      .eq('id', paymentId);

    if (paymentUpdateError) {
      throw new Error('Failed to update payment status');
    }

    // Get payment details for RSVP
    const { data: payment } = await supabaseClient
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    // Create RSVP record
    const { data: rsvp, error: rsvpError } = await supabaseClient
      .from('rsvps')
      .insert({
        event_id: eventId,
        payment_id: paymentId,
        user_email: payment.user_email,
        full_name: payment.full_name,
        quantity: quantity,
        status: 'confirmed',
      })
      .select()
      .single();

    if (rsvpError) {
      throw new Error('Failed to create RSVP');
    }

    // Update event attendee count
    const { error: eventUpdateError } = await supabaseClient
      .rpc('increment_attendees', { event_id: eventId, increment_by: quantity });

    if (eventUpdateError) {
      console.warn('Failed to update attendee count:', eventUpdateError);
    }

    return new Response(JSON.stringify({ 
      success: true,
      rsvpId: rsvp.id,
      message: 'Payment confirmed and RSVP created successfully'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Payment confirmation failed' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});