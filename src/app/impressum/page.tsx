import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung nach § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-8">
        Impressum
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground-secondary leading-relaxed">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
          Angaben gem. &sect; 5 TMG
        </h2>
        <p>
          Dominik Weyh
          <br />
          Adolf-Ernst-Schuth-Stra&szlig;e 2a
          <br />
          55122 Mainz
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Kontakt
        </h2>
        <p>
          E-Mail:{" "}
          <a
            href="mailto:weyh.business@gmail.com"
            className="text-claw-400 hover:text-claw-300 transition-colors"
          >
            weyh.business@gmail.com
          </a>
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Inhaltlich verantwortlich gem. &sect; 18 Abs. 2 MStV
        </h2>
        <p>
          Dominik Weyh
          <br />
          Adolf-Ernst-Schuth-Stra&szlig;e 2a
          <br />
          55122 Mainz
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Haftungsausschluss
        </h2>
        <h3 className="text-lg font-semibold text-white mt-4">
          Haftung f&uuml;r Inhalte
        </h3>
        <p>
          Die Inhalte dieser Website wurden mit gr&ouml;&szlig;tm&ouml;glicher
          Sorgfalt erstellt. F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und
          Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine
          Gew&auml;hr &uuml;bernehmen.
        </p>
        <p>
          Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 TMG
          f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder
          gespeicherte fremde Informationen zu &uuml;berwachen. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
          umgehend entfernen.
        </p>

        <h3 className="text-lg font-semibold text-white mt-4">
          Haftung f&uuml;r Links
        </h3>
        <p>
          Diese Website enth&auml;lt Verkn&uuml;pfungen zu Websites Dritter
          (&ldquo;externe Links&rdquo;). Diese Websites unterliegen der Haftung
          der jeweiligen Betreiber. Zum Zeitpunkt der Verlinkung waren keine
          Rechtsverst&ouml;&szlig;e erkennbar. Bei Bekanntwerden von
          Rechtsverletzungen werden betroffene Links umgehend entfernt.
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Disclaimer &mdash; Use Cases &amp; Revenue Estimates
        </h2>
        <p>
          The use cases listed on Clawledge are curated from public sources
          including social media, community forums, and official documentation.
          They serve informational purposes only and do not constitute legal,
          financial, or technical advice.
        </p>
        <p>
          Revenue and cost estimates displayed on use case pages are
          approximations based on publicly available information. Actual results
          may vary. We make no guarantees regarding income potential,
          performance, or suitability of any use case.
        </p>
        <p>
          Clawledge is an independent project and is{" "}
          <strong>
            not affiliated with Anthropic, OpenClaw, or Peter Steinberger
          </strong>
          . All trademarks belong to their respective owners.
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Streitschlichtung
        </h2>
        <p>
          Die Europ&auml;ische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-claw-400 hover:text-claw-300 transition-colors"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </div>
    </div>
  );
}
