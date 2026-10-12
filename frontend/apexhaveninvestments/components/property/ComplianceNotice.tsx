import Link from "next/link";
import { CheckIcon } from "@/components/ui/Icons";

export default function ComplianceNotice() {
  return (
    <section className="rounded-3xl border border-gold/30 bg-white p-6 sm:p-10 shadow-lg">
      <div className="max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest">
          Professional Standard &amp; Regulatory Boundaries
        </span>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-forest">
          Trust, Consumer Protection &amp; Advisory Boundaries
        </h3>
        <p className="mt-3 text-sm text-charcoal-muted leading-relaxed">
          Apex Haven Investments operates with unyielding transparency. To ensure your interests and capital remain completely protected, we maintain unambiguous boundaries between independent buyer advisory and statutory professional disciplines in Kenya.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="rounded-2xl bg-ivory p-5 border border-gold/20">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-forest text-gold text-xs font-bold mb-3">
            01
          </div>
          <h4 className="font-display text-base font-bold text-forest">
            No Speculative Guarantees
          </h4>
          <p className="mt-2 text-xs text-charcoal leading-relaxed">
            All rental feasibility modeling, rental yields, and property price trends are based on verifiable market transactions, historical data, and clearly stated assumptions. We strictly adhere to fair-trading principles and <strong>never make guaranteed return or capital appreciation claims</strong>.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="rounded-2xl bg-ivory p-5 border border-gold/20">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-forest text-gold text-xs font-bold mb-3">
            02
          </div>
          <h4 className="font-display text-base font-bold text-forest">
            Legal &amp; Valuation Boundaries
          </h4>
          <p className="mt-2 text-xs text-charcoal leading-relaxed">
            Apex Haven acts as your buyer advocate and strategic advisor. Our dossiers and comparison matrices do not replace formal advocate representation (conveyancing by an Advocate of the High Court of Kenya) or certified institutional valuations (conducted by registered ISIK / RICS valuers).
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="rounded-2xl bg-ivory p-5 border border-gold/20">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-forest text-gold text-xs font-bold mb-3">
            03
          </div>
          <h4 className="font-display text-base font-bold text-forest">
            Buyer-First Independence
          </h4>
          <p className="mt-2 text-xs text-charcoal leading-relaxed">
            Unlike commission-driven brokers who push specific developers for high sales cuts, our paid advisory fees keep us strictly loyal to you. We examine zoning restrictions, beacon validity, access infrastructure, and encumbrances with complete objectivity.
          </p>
        </div>
      </div>

      {/* Legal Links Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-charcoal-muted">
        <div className="flex items-center gap-2">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-100 text-emerald-800">
            <CheckIcon size={10} />
          </span>
          <span>Compliant with Kenyan Consumer Protection and Data Protection Acts.</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/terms" className="hover:text-forest underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-forest underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="/cancellation-refunds" className="hover:text-forest underline underline-offset-4">
            Refund &amp; Cancellation Policy
          </Link>
          <Link href="/service-limitations" className="hover:text-forest underline underline-offset-4">
            Service Limitations
          </Link>
        </div>
      </div>
    </section>
  );
}
