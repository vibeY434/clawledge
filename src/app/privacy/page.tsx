import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Clawledge — how we handle your data, what we collect, and your rights under GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-foreground-secondary text-sm mb-10">
        Last updated: February 18, 2026
      </p>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground-secondary leading-relaxed">
        {/* --- 1. Controller --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            1. Data Controller
          </h2>
          <p>
            The controller responsible for data processing on this website is:
          </p>
          <p>
            Dominik Weyh
            <br />
            Adolf-Ernst-Schuth-Stra&szlig;e 2a
            <br />
            55122 Mainz, Germany
            <br />
            Email:{" "}
            <a
              href="mailto:weyh.business@gmail.com"
              className="text-claw-400 hover:text-claw-300 transition-colors"
            >
              weyh.business@gmail.com
            </a>
          </p>
        </section>

        {/* --- 2. Overview --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            2. What Data We Collect
          </h2>
          <p>
            Clawledge is designed to be privacy-friendly. We collect minimal data
            to operate this website:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Server logs:</strong> When you visit our site, our hosting
              provider (Vercel) automatically collects technical data such as your
              IP address, browser type, operating system, referring URL, and
              timestamp. This data is processed to deliver the website and ensure
              security.
            </li>
            <li>
              <strong>Analytics:</strong> We use Vercel Web Analytics, a
              privacy-friendly analytics service that does not use cookies and
              does not track individual users. It collects aggregated, anonymized
              page view data only.
            </li>
            <li>
              <strong>Submission form:</strong> If you submit a use case via our{" "}
              <Link
                href="/submit"
                className="text-claw-400 hover:text-claw-300 transition-colors"
              >
                /submit
              </Link>{" "}
              page, you voluntarily provide data such as your name, contact
              information, and use case details. This data is stored in a Google
              Sheets document for review purposes.
            </li>
          </ul>
        </section>

        {/* --- 3. Purpose & Legal Basis --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            3. Purpose and Legal Basis
          </h2>
          <p>We process your data for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Website delivery &amp; security</strong> (server logs) —
              Legal basis: Legitimate interest (Art. 6(1)(f) GDPR)
            </li>
            <li>
              <strong>Website improvement</strong> (anonymous analytics) —
              Legal basis: Legitimate interest (Art. 6(1)(f) GDPR)
            </li>
            <li>
              <strong>Processing submissions</strong> (use case form) — Legal
              basis: Consent (Art. 6(1)(a) GDPR), given by voluntarily submitting
              the form
            </li>
          </ul>
        </section>

        {/* --- 4. Third-Party Services --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            4. Third-Party Services
          </h2>

          <h3 className="text-lg font-semibold text-white mt-4">
            Vercel (Hosting &amp; Analytics)
          </h3>
          <p>
            This website is hosted on Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, USA. Vercel processes server logs and provides
            anonymized web analytics. Vercel complies with GDPR and offers a{" "}
            <a
              href="https://vercel.com/legal/dpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-claw-400 hover:text-claw-300 transition-colors"
            >
              Data Processing Agreement
            </a>
            . Data may be transferred to the USA under appropriate safeguards.
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">
            Google Sheets (Submission Storage)
          </h3>
          <p>
            Use case submissions are stored in Google Sheets via the Google Sheets
            API (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Ireland). Only data you voluntarily provide through the submission form
            is stored. Google acts as a data processor under our instructions.
          </p>
        </section>

        {/* --- 5. Cookies --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            5. Cookies
          </h2>
          <p>
            This website does <strong>not use tracking cookies</strong>. Vercel
            Web Analytics is a cookie-free analytics solution. Your browser may
            store technically necessary cookies (e.g., for content delivery), but
            we do not set any cookies for advertising, tracking, or profiling
            purposes. No cookie consent banner is required.
          </p>
        </section>

        {/* --- 6. Data Retention --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            6. Data Retention
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Server logs:</strong> Retained by Vercel for up to 30 days,
              then automatically deleted.
            </li>
            <li>
              <strong>Analytics data:</strong> Aggregated and anonymized; no
              personal data is retained.
            </li>
            <li>
              <strong>Submissions:</strong> Stored until the submission is
              reviewed and either published or rejected. You may request deletion
              at any time.
            </li>
          </ul>
        </section>

        {/* --- 7. Your Rights --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            7. Your Rights Under GDPR
          </h2>
          <p>
            Under the General Data Protection Regulation (GDPR), you have the
            following rights:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Right of access</strong> (Art. 15 GDPR) — You can request
              information about your stored data.
            </li>
            <li>
              <strong>Right to rectification</strong> (Art. 16 GDPR) — You can
              request correction of inaccurate data.
            </li>
            <li>
              <strong>Right to erasure</strong> (Art. 17 GDPR) — You can request
              deletion of your data.
            </li>
            <li>
              <strong>Right to restriction</strong> (Art. 18 GDPR) — You can
              request restricted processing of your data.
            </li>
            <li>
              <strong>Right to data portability</strong> (Art. 20 GDPR) — You can
              request your data in a machine-readable format.
            </li>
            <li>
              <strong>Right to object</strong> (Art. 21 GDPR) — You can object to
              data processing based on legitimate interest.
            </li>
            <li>
              <strong>Right to withdraw consent</strong> (Art. 7(3) GDPR) — You
              can withdraw consent at any time (e.g., for submissions).
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:weyh.business@gmail.com"
              className="text-claw-400 hover:text-claw-300 transition-colors"
            >
              weyh.business@gmail.com
            </a>
            .
          </p>
        </section>

        {/* --- 8. Supervisory Authority --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            8. Right to Lodge a Complaint
          </h2>
          <p>
            You have the right to lodge a complaint with a data protection
            supervisory authority (Art. 77 GDPR). The competent authority for
            Rhineland-Palatinate is:
          </p>
          <p>
            Der Landesbeauftragte f&uuml;r den Datenschutz und die
            Informationsfreiheit Rheinland-Pfalz
            <br />
            Hintere Bleiche 34
            <br />
            55116 Mainz
            <br />
            <a
              href="https://www.datenschutz.rlp.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-claw-400 hover:text-claw-300 transition-colors"
            >
              www.datenschutz.rlp.de
            </a>
          </p>
        </section>

        {/* --- 9. Changes --- */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time to reflect changes
            in our practices or legal requirements. The date at the top of this
            page indicates when the policy was last updated.
          </p>
        </section>
      </div>
    </div>
  );
}
