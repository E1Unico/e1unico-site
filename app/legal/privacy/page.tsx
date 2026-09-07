import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — E1 Unico Corporation",
  description: "How E1 Unico Corporation collects, uses, and protects your information.",
};

const gold = "#c9a84c";
const sectionStyle: React.CSSProperties = { marginBottom: 28 };
const hStyle: React.CSSProperties = { fontSize: 18, fontWeight: 800, color: gold, marginBottom: 10 };
const pStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: "#d1d5db", marginBottom: 10 };

export default function PrivacyPolicy() {
  return (
    <main style={{ minHeight: "100vh", background: "#05050a", color: "white" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 20px 60px" }}>
        <Link href="/" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>← Back to E1Unico.com</Link>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginTop: 20, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 40 }}>Last updated September 7, 2026</p>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Who we are</h2>
          <p style={pStyle}>
            E1 Unico Corporation (&quot;E1 Unico,&quot; &quot;we,&quot; &quot;us&quot;) is a BBB Accredited Texas business
            based in Spring, TX. This policy covers E1Unico.com and the ordering, chat, and
            waitlist tools on it (including UnicoJam&apos;s early-access page). It does not cover
            UnicoOS.app, which has its own privacy policy.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Information we collect</h2>
          <p style={pStyle}>We collect information you give us directly, including:</p>
          <p style={pStyle}>
            • Name, email, phone number, and business details you enter when placing an order,
            submitting a strategy-session request, or joining a waitlist.<br />
            • Messages you send our Ask Unico chat assistant, including the conversation
            transcript, so our team can follow up on your question.<br />
            • Payment information when you check out — this is collected and processed directly
            by Stripe; we never see or store your full card number.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>How we use it</h2>
          <p style={pStyle}>
            We use your information to fulfill orders, respond to inquiries, provide customer
            support, and send service-related communications (order confirmations, appointment
            reminders, account notices). We do not sell your personal information.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Who we share it with</h2>
          <p style={pStyle}>
            We share information only with the service providers that power the site, each
            bound to use it solely to provide their service to us:
          </p>
          <p style={pStyle}>
            • <strong>Stripe</strong> — payment processing.<br />
            • <strong>Resend</strong> — transactional email (order confirmations, lead notices).<br />
            • <strong>Google (Gemini)</strong> and/or <strong>OpenAI</strong> — power the Ask
            Unico chat assistant; your chat messages may be sent to these providers to generate
            a reply.<br />
            • <strong>Telegram</strong> — internal team notifications when a new lead or order
            comes in.<br />
            • <strong>Google AdSense</strong> — may set cookies to serve and measure ads on this
            site; see Google&apos;s own privacy policy for how it uses that data.
          </p>
          <p style={pStyle}>
            We disclose information if required by law or to protect the rights, property, or
            safety of E1 Unico, our customers, or others.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Cookies</h2>
          <p style={pStyle}>
            This site uses cookies set by Google AdSense for advertising and, where enabled, by
            our checkout and analytics tools to remember your session. You can block cookies in
            your browser settings; the site will still function, though some features (like a
            saved checkout session) may not.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Data retention</h2>
          <p style={pStyle}>
            We keep order and customer records as long as needed to provide our services and to
            meet our accounting, tax, and legal obligations. Chat transcripts and waitlist
            signups are kept only as long as needed to follow up with you.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Your choices</h2>
          <p style={pStyle}>
            You can ask us to access, correct, or delete the personal information we hold about
            you, or to stop contacting you, by emailing{" "}
            <a href="mailto:Unico@E1Unico.com" style={{ color: gold }}>Unico@E1Unico.com</a> or
            calling <a href="tel:18333186426" style={{ color: gold }}>1-833-E1-UNICO</a>.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Children&apos;s privacy</h2>
          <p style={pStyle}>
            Our services are directed at business owners and are not intended for children under
            13. We do not knowingly collect personal information from children under 13.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={hStyle}>Changes to this policy</h2>
          <p style={pStyle}>
            We may update this policy from time to time. We&apos;ll post the new version here with an
            updated &quot;last updated&quot; date.
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
