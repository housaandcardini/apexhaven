import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";

export const metadata = {
  title: "Cancellation, Rescheduling & Refund Policy | Apex Haven Investments",
  description: "Transparent cancellation, rescheduling and refund terms for all Apex Haven service packages.",
};

export default function CancellationRefundsPage() {
  return (
    <InnerPage
      crumb="Cancellation & Refunds"
      title="Cancellation, Rescheduling & Refund Policy"
      description="Clear, fair, and transparent guidelines governing package cancellations, appointment rescheduling, and refund eligibility."
      image={images.luxuryHouse}
      cta={false}
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-charcoal leading-relaxed space-y-8">
        <div>
          <h2 className="text-xl font-bold font-display text-forest">1. Overview</h2>
          <p className="mt-2 text-sm text-slate-700">
            At Apex Haven Investments Limited, we maintain clear, fair commercial policies. Because our services involve dedicated professional time, market research, and supplier coordination, cancellations and refunds are subject to the specific package tiers outlined below.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">2. Advisory &amp; Discovery Consultations (Fixed KSh 3,000 / KSh 5,000)</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1.5">
            <li><strong>Notice of 24 hours or more:</strong> Full (100%) refund or free rescheduling to another mutually convenient date.</li>
            <li><strong>Notice between 12 and 24 hours:</strong> Free rescheduling permitted once. Cancellations subject to a 20% administrative handling charge.</li>
            <li><strong>Less than 12 hours notice or no-show:</strong> Non-refundable due to reserved consultant calendar allocation. Rescheduling may be permitted under extraordinary circumstances at management discretion.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">3. Property Shortlists &amp; Comparison Reports (KSh 7,500 / KSh 15,000)</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1.5">
            <li><strong>Cancellation within 6 hours of brief submission:</strong> 100% refund.</li>
            <li><strong>Cancellation after preliminary research has commenced (before final dossier dispatch):</strong> 50% refund to offset researcher and title search disbursements incurred.</li>
            <li><strong>After delivery of completed shortlist or comparison report:</strong> Non-refundable once intellectual property and analytical reports have been dispatched.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">4. Concept Design Packages &amp; Sourcing Briefs</h2>
          <p className="mt-2 text-sm text-slate-700">
            For Single-Room Concepts (KSh 25,000) and Multi-Category Sourcing Briefs (KSh 15,000), a 50% refund is available if cancelled before 3D visualization rendering or supplier price compilation begins. Completed design deliverables include 1 comprehensive revision cycle within 7 business days of delivery.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">5. Quotation-Based Project Milestones &amp; Custom Art Commissions</h2>
          <p className="mt-2 text-sm text-slate-700">
            Project procurement agreements, full turnkey interior fit-outs, and commissioned artworks operate under milestone agreements. Milestone deposits dedicated to manufacturer purchase orders, factory cutting, or artist raw materials are non-refundable once committed. Unspent project balances are reconciled and returned according to the signed project contract.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">6. Refund Processing</h2>
          <p className="mt-2 text-sm text-slate-700">
            Approved refunds are remitted to the original payment method (M-Pesa number or originating payment card) within 3 to 5 business days, accompanied by an administrative credit note.
          </p>
        </div>
      </div>
    </InnerPage>
  );
}
