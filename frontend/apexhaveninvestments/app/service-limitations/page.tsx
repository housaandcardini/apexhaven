import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";

export const metadata = {
  title: "Service Scope & Limitations | Apex Haven Investments",
  description: "Clear disclosures regarding professional advisory scope, non-speculative standards, and third-party contractor relationships.",
};

export default function ServiceLimitationsPage() {
  return (
    <InnerPage
      crumb="Service Limitations"
      title="Service Scope and Limitations"
      description="Transparent professional disclosures clarifying the scope of our advisory, limits of liability, and third-party contractor boundaries."
      image={images.luxuryHouse}
      cta={false}
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-charcoal leading-relaxed space-y-8">
        <div>
          <h2 className="text-xl font-bold font-display text-forest">1. Nature of Advisory Services</h2>
          <p className="mt-2 text-sm text-slate-700">
            Apex Haven Investments Limited provides specialized advisory, spatial interior design concepts, market due diligence, and procurement coordination. We provide strategic analysis to help clients navigate real estate, procurement, interiors, and art acquisition in Kenya.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">2. Legal &amp; Conveyancing Boundaries</h2>
          <p className="mt-2 text-sm text-slate-700">
            Our title checks and due diligence reviews are commercial and preliminary in nature. While our team audits land registry records, planning zoning, and seller credentials, <strong>our advisory does not constitute legal conveyancing</strong>. Clients entering formal agreements for sale must instruct a qualified, practicing advocate of the High Court of Kenya to execute formal title conveyancing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">3. No Guaranteed Investment Returns</h2>
          <p className="mt-2 text-sm text-slate-700">
            Real estate values, rental yields, and capital appreciation are subject to macroeconomic market dynamics, currency movements, and infrastructure developments in Kenya. Apex Haven does not guarantee specific yields, capital appreciation rates, or occupancy levels. All financial models are estimates based on prevailing market data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">4. Procurement &amp; Supplier Relationships</h2>
          <p className="mt-2 text-sm text-slate-700">
            When coordinating procurement, Apex Haven identifies vetted manufacturers, negotiates wholesale pricing, and coordinates delivery schedules. Product warranties (e.g. KEBS compliance, manufacturer defect warranties) remain the direct legal responsibility of the manufacturer or certified distributor.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">5. Structural Engineering &amp; Statutory Permits</h2>
          <p className="mt-2 text-sm text-slate-700">
            Interior design concept drawings and spatial layouts are aesthetic and functional proposals. If structural alterations, load-bearing removals, or exterior facade modifications are contemplated, clients must obtain registered structural engineering calculations and formal county government building permits.
          </p>
        </div>
      </div>
    </InnerPage>
  );
}
