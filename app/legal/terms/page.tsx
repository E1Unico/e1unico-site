import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — E1 Unico Corporation",
  description: "The terms that govern orders, payments, and services purchased from E1 Unico Corporation.",
};

const gold = "#c9a84c";
const sectionStyle: React.CSSProperties = { marginBottom: 28 };
const hStyle: React.CSSProperties = { fontSize: 18, fontWeight: 800, color: gold, marginBottom: 10 };
const pStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: "#d1d5db", marginBottom: 10 };

export default function TermsOfService() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 20px 60px" }}>
        <Link href="/" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>← Back to E1Unico.com</Link>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 40 }}>Last updated September 7, 2026</p>

        <div style={sectionStyle}>
          <p style={pStyle}>
            These Terms of Service (&quot;Terms&quot;) govern your purchase and use of services from E1
            Unico Corporation (&quot;E1 Unico,&quot; &quot;we,&quot; &quot;us&quot;), a BBB Accredited business based in
            Spring, TX. By placing an order or using E1Unico.com, you agree to these Terms.
            UnicoOS.app is a separate product with its own terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Our services</h2>
          <p style={pStyle}>
            We offer business-formation, branding, website, career-document, and consulting
            services, along with UnicoOS software subscriptions and UnicoCare hosting/support
            plans, as described on this site at the time you order. Some packages (like the 2K
            Special) bundle multiple services and a first month of a subscription plan.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Orders and payment</h2>
          <p style={pStyle}>
            Prices are shown in U.S. dollars at checkout. Payments are processed securely by
            Stripe; by submitting an order you authorize us to charge the payment method you
            provide for the amount shown, including recurring charges for any subscription or
            monthly plan you select, until you cancel.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Subscriptions and cancellation</h2>
          <p style={pStyle}>
            Subscription plans (UnicoOS, UnicoCare, website hosting/care, and similar recurring
            services) renew automatically each billing period until canceled. You can cancel by
            emailing <a href="mailto:Unico@E1Unico.com" style={{ color: gold }}>Unico@E1Unico.com</a>{" "}
            or calling <a href="tel:18333186426" style={{ color: gold }}>1-833-E1-UNICO</a>;
            cancellation stops future billing but does not refund the current billing period
            already paid for.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Refunds</h2>
          <p style={pStyle}>
            One-time service fees (entity formation, EIN filing, branding, websites, resumes,
            and similar deliverables) are non-refundable once work has begun, since state filing
            fees and labor are incurred immediately. If we haven&apos;t yet started work on your
            order, contact us within 48 hours of purchase for a full refund. Subscription
            charges already billed are non-refundable; cancel any time to stop future charges.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Your responsibilities</h2>
          <p style={pStyle}>
            You&apos;re responsible for giving us accurate business and contact information, and for
            responding promptly when we need information from you to complete a filing or
            deliverable. Delays caused by incomplete or inaccurate information are not our
            responsibility.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>No professional advice</h2>
          <p style={pStyle}>
            E1 Unico provides business-formation and consulting services, not legal, tax, or
            accounting advice. Nothing on this site or delivered as part of our services should
            be treated as legal or tax advice — consult a licensed attorney or CPA for advice
            specific to your situation.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Limitation of liability</h2>
          <p style={pStyle}>
            To the fullest extent permitted by law, E1 Unico&apos;s total liability for any claim
            arising from our services is limited to the amount you paid us for the specific
            service giving rise to the claim. We are not liable for indirect, incidental, or
            consequential damages.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Governing law</h2>
          <p style={pStyle}>
            These Terms are governed by the laws of the State of Texas, without regard to
            conflict-of-law rules. Any dispute will be resolved in the state or federal courts
            located in Texas.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Changes to these Terms</h2>
          <p style={pStyle}>
            We may update these Terms from time to time. We&apos;ll post the new version here with an
            updated &quot;last updated&quot; date; continued use of our services after a change means you
            accept the updated Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Contact us</h2>
          <p style={pStyle}>
            E1 Unico Corporation · Spring, TX ·{" "}
            <a href="mailto:Unico@E1Unico.com" style={{ color: gold }}>Unico@E1Unico.com</a> ·{" "}
            <a href="tel:18333186426" style={{ color: gold }}>1-833-E1-UNICO</a>
          </p>
        </div>
      </div>
    </main>
  );
}
