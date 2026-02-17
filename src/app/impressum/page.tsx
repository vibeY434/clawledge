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

      <div className="prose prose-sm max-w-none space-y-6">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
          Angaben gem. § 5 TMG
        </h2>
        <p className="text-foreground-secondary leading-relaxed">
          Dominik Weyh
          <br />
          Adolf-Ernst-Schuth-Straße 2a
          <br />
          55122 Mainz
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Kontakt
        </h2>
        <p className="text-foreground-secondary leading-relaxed">
          E-Mail:{" "}
          <a
            href="mailto:weyh.business@gmail.com"
            className="text-claw-400 hover:text-claw-300 transition-colors"
          >
            weyh.business@gmail.com
          </a>
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Haftungsausschluss
        </h2>
        <p className="text-foreground-secondary leading-relaxed">
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>
        <p className="text-foreground-secondary leading-relaxed">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Externe Links
        </h2>
        <p className="text-foreground-secondary leading-relaxed">
          Diese Website enthält Verknüpfungen zu Websites Dritter. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
        </p>
      </div>
    </div>
  );
}
