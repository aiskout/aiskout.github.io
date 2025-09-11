import Stripe from 'stripe';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (url.pathname === "/register" && request.method === "POST") {
        const { email, domain } = await request.json();

        // Validate email and domain
        if (!email || !domain) {
          return new Response(JSON.stringify({ error: "Email and domain required" }), 
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Generate verification token
        const token = btoa(`${email}|${domain}|${Date.now()}`);
        
        // Store pending registration in KV (expires in 1 hour)
        await env.REGISTRATIONS.put(token, JSON.stringify({ email, domain }), { expirationTtl: 3600 });

        // Send verification email via Resend
        const verifyUrl = `https://aiskout.github.io/verify?token=${token}`;
        
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "noreply@aiskout.com",
            to: email,
            subject: "Verify your email for WordPress Supabase Connector",
            html: `
              <h2>Verify Your Email</h2>
              <p>Click the link below to verify your email and proceed with your WordPress Supabase Connector license:</p>
              <p><a href="${verifyUrl}" style="background: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Verify Email & Continue</a></p>
              <p>Domain: ${domain}</p>
              <p>This link expires in 1 hour.</p>
            `
          })
        });

        return new Response(JSON.stringify({ status: "verification_sent" }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      if (url.pathname === "/verify" && request.method === "GET") {
        const token = url.searchParams.get('token');
        
        if (!token) {
          return new Response("Invalid verification link", { status: 400 });
        }

        // Get registration data
        const registrationData = await env.REGISTRATIONS.get(token);
        if (!registrationData) {
          return new Response("Verification link expired or invalid", { status: 400 });
        }

        const { email, domain } = JSON.parse(registrationData);

        // TODO: Verify domain ownership via DNS TXT record
        // const domainVerified = await verifyDomainOwnership(domain);
        
        // Create Stripe checkout session
        const stripe = new Stripe(env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: { 
                name: 'WordPress Supabase Connector License',
                description: `Commercial license for ${domain}`
              },
              unit_amount: 1000, // $10
            },
            quantity: 1,
          }],
          customer_email: email,
          metadata: { email, domain, token },
          success_url: 'https://aiskout.github.io/success',
          cancel_url: 'https://aiskout.github.io/cancel',
        });

        // Redirect to Stripe checkout
        return Response.redirect(session.url, 302);
      }

      if (url.pathname === "/webhook" && request.method === "POST") {
        const payload = await request.text();
        const stripe = new Stripe(env.STRIPE_SECRET_KEY);

        let event;
        try {
          event = stripe.webhooks.constructEvent(
            payload,
            request.headers.get("stripe-signature"),
            env.STRIPE_WEBHOOK_SECRET
          );
        } catch (err) {
          return new Response(`Webhook Error: ${err.message}`, { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
          const session = event.data.object;
          const { email, domain } = session.metadata;

          // Generate license key
          const licenseData = `${email}|${domain}|${Date.now()}`;
          const license = btoa(licenseData + "|" + env.SECRET_KEY);

          // Store license in KV
          await env.LICENSES.put(`${email}:${domain}`, license);

          // Send license via Resend
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: "licenses@aiskout.com",
              to: email,
              subject: "Your WordPress Supabase Connector License",
              html: `
                <h2>License Key Delivered!</h2>
                <p>Thank you for purchasing the WordPress Supabase Connector license.</p>
                <p><strong>Domain:</strong> ${domain}</p>
                <p><strong>License Key:</strong></p>
                <code style="background: #f4f4f4; padding: 8px; display: block; word-break: break-all;">${license}</code>
                <p><strong>Download:</strong> <a href="https://github.com/aiskout-org/wp-supabase-connector/releases">Get Plugin</a></p>
                <h3>Installation:</h3>
                <ol>
                  <li>Download the plugin from the link above</li>
                  <li>Upload to WordPress Admin → Plugins → Add New → Upload Plugin</li>
                  <li>Activate the plugin</li>
                  <li>Enter your license key in Settings → Supabase Connector</li>
                </ol>
              `
            })
          });

          // Clean up registration token
          if (session.metadata.token) {
            await env.REGISTRATIONS.delete(session.metadata.token);
          }
        }

        return new Response("ok");
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
      
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
  }
};

// Helper function for domain verification (implement as needed)
async function verifyDomainOwnership(domain) {
  // Check DNS TXT record for verification
  // Return true if verified, false otherwise
  return true; // Simplified for now
}
