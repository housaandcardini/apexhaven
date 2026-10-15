import { images } from "@/assets";
import InnerPage from "@/components/sections/InnerPage";

export const metadata = {
  title: "Terms and Conditions | Apex Haven Investments",
  description: "Terms and Conditions of Apex Haven Investments Limited governing service packages, payments, and client engagements.",
};

export default function TermsPage() {
  return (
    <InnerPage
      crumb="Terms & Conditions"
      title="Terms and Conditions"
      description="Legal agreement governing your use of the Apex Haven Investments Limited platform, service packages, quotations, and online payment facilities."
      image={images.luxuryHouse}
      cta={false}
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-charcoal leading-relaxed space-y-8">
        <div>
          <h2 className="text-xl font-bold font-display text-forest">1. Introduction &amp; Corporate Identity</h2>
          <p className="mt-2 text-sm text-slate-700">
            These Terms and Conditions govern your engagement with <strong>Apex Haven Investments Limited</strong> (&quot;Apex Haven&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a limited liability company incorporated under the Companies Act of the Republic of Kenya. By selecting a service package, booking a consultation, paying online, or submitting a quotation brief, you acknowledge that you have read, understood, and agreed to be bound by these terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">2. Service Scope &amp; Transparency</h2>
          <p className="mt-2 text-sm text-slate-700">
            Apex Haven provides advisory, intelligence, spatial design, and procurement coordination services across four principal branches: (a) Property and Investment Advisory, (b) Procurement, Project Supply and Building Solutions, (c) Interior Design and Spatial Solutions, and (d) Art, Curation and Commissions.
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Every paid package displays its scope, price in Kenya Shillings (KSh), inclusions, exclusions, and deliverables upfront. Apex Haven acts with reasonable professional skill and diligence. Our property and investment advisory services constitute professional advisory analysis and do not replace independent legal conveyancing representation by a licensed advocate of the High Court of Kenya.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">3. Pricing, Payments &amp; Taxes</h2>
          <p className="mt-2 text-sm text-slate-700">
            All prices on our website are stated in Kenya Shillings (KSh) and are inclusive of applicable statutory taxes (including Value Added Tax where applicable) unless explicitly specified otherwise. Online payments processed via M-Pesa or Card are subject to secure verification through certified Kenyan payment channels. Orders are only confirmed upon authenticated payment verification.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">4. Quotations &amp; Milestone Agreements</h2>
          <p className="mt-2 text-sm text-slate-700">
            For project procurement coordination, turnkey interior fit-outs, and commissioned art, formal written proposals are issued detailing milestones, delivery timelines, and deposit terms. Apex Haven does not commit supplier availability or factory pricing until verified with the respective manufacturer.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">5. Non-Speculative Advisory Standard</h2>
          <p className="mt-2 text-sm text-slate-700">
            In compliance with Kenyan consumer protection principles, Apex Haven does not make speculative guarantees regarding investment returns, future property appreciation, or contractor timelines outside our direct contractual control.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold font-display text-forest">6. Governing Law &amp; Jurisdiction</h2>
          <p className="mt-2 text-sm text-slate-700">
            These terms shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any dispute arising out of or in connection with these terms shall be subject to amicable negotiation, failing which it shall be referred to the exclusive jurisdiction of the Kenyan courts.
          </p>
        </div>

        <p className="text-xs text-slate-500 pt-4 border-t border-slate-200">
          Last revised: October 2026. For questions, contact enquiries@apexhaveninvestments.com.
        </p>
      </div>
    </InnerPage>
  );
}
